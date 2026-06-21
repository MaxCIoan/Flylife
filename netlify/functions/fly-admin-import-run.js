import { query } from "../../db/index.js";
import { ALLOWED_ROUNDS } from "../../lib/fly-scoring.js";
import { cleanDisplayName, cleanPlayerId, emptyResponse, isGuestDisplayName, jsonResponse, logError, logMetric } from "./_shared.js";

const MAX_SCORE_PER_ROUND = 80000;
const MIN_MS_PER_ROUND = 2500;

function authorized(request) {
  const token = process.env.FLY_ADMIN_TOKEN;
  if (!token) return false;
  return request.headers.get("x-fly-admin-token") === token;
}

async function readBody(request) {
  const text = await request.text();
  return text ? JSON.parse(text) : {};
}

function hasScoringEvent(session = {}) {
  return Array.isArray(session.logs)
    && session.logs.some((log) => (
      Boolean(log?.success)
      || Number(log?.score || 0) > 0
      || Number(log?.techEarned || 0) > 0
      || (Array.isArray(log?.scoreEvents) && log.scoreEvents.length > 0)
      || (Array.isArray(log?.landings) && log.landings.length > 0)
    ));
}

function safeDate(value, fallback = new Date()) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? new Date(parsed) : fallback;
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });
  if (!authorized(request)) return jsonResponse(403, { error: "admin token required" });

  try {
    const body = await readBody(request);
    const session = body.session && typeof body.session === "object" ? body.session : {};
    const playerId = cleanPlayerId(body.playerId || session.playerId);
    const displayName = cleanDisplayName(body.displayName || session.displayName);
    if (isGuestDisplayName(displayName)) return jsonResponse(400, { error: "display name is required" });

    const rounds = Math.trunc(Number(session.rounds ?? session.selectedRounds) || 0);
    const completedRounds = Math.trunc(Number(session.completedRounds) || 0);
    const finalScore = Math.round(Number(session.score) || 0);
    if (!ALLOWED_ROUNDS.includes(rounds)) return jsonResponse(400, { error: "invalid round count" });
    if (completedRounds < 0 || completedRounds > rounds) return jsonResponse(400, { error: "invalid completed round count" });
    if (finalScore <= 0 || finalScore > rounds * MAX_SCORE_PER_ROUND) return jsonResponse(400, { error: "invalid score" });
    if (!hasScoringEvent(session)) return jsonResponse(400, { error: "no scoring events found in local run" });

    const sourceId = String(session.id || body.sourceId || crypto.randomUUID()).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
    const runId = `admin-import-${sourceId}`;
    const existing = await query(
      `select run_id as "runId", final_score as "finalScore"
       from fly_runs
       where run_id = $1
       limit 1`,
      [runId]
    );
    if (existing.rows[0]) {
      return jsonResponse(200, { ok: true, alreadyImported: true, ...existing.rows[0] });
    }

    const finishedAt = safeDate(body.finishedAt || session.createdAt);
    const elapsedMs = Math.max(
      Math.round(Number(body.elapsedMs || session.elapsedMs) || 0),
      rounds * MIN_MS_PER_ROUND
    );
    const startedAt = new Date(finishedAt.getTime() - elapsedMs);
    const payload = {
      ...session,
      playerId,
      displayName,
      adminImported: true,
      sourceLocalRunId: session.id || null
    };

    const { rows: players } = await query(
      `insert into fly_players (player_id, display_name, display_name_locked, rank_points)
       values ($1, $2, true, $3)
       on conflict (player_id) do update
       set display_name = excluded.display_name,
           display_name_locked = true,
           rank_points = fly_players.rank_points + excluded.rank_points,
           updated_at = now()
       returning player_id as "playerId",
                 display_name as "displayName",
                 display_name_locked as "displayNameLocked",
                 rank_points as "rankPoints"`,
      [playerId, displayName, finalScore]
    );

    const { rows } = await query(
      `insert into fly_runs (
         run_id, token, player_id, display_name, mode, rounds, started_at, finished_at,
         status, payload, final_score, elapsed_ms, tampered, tamper_reason
       )
       values ($1, $2, $3, $4, 'rocket', $5, $6, $7, 'completed', $8::jsonb, $9, $10, false, null)
       returning run_id as "runId",
                 player_id as "playerId",
                 display_name as "displayName",
                 rounds,
                 final_score as "finalScore",
                 elapsed_ms as "elapsedMs",
                 finished_at as "finishedAt"`,
      [
        runId,
        crypto.randomUUID(),
        playerId,
        displayName,
        rounds,
        startedAt,
        finishedAt,
        JSON.stringify(payload),
        finalScore,
        elapsedMs
      ]
    );

    logMetric("fly-admin-import-run", "imported local run", { runId, playerId, finalScore, rounds });
    return jsonResponse(200, { ok: true, ...rows[0], player: players[0] || null });
  } catch (error) {
    logError("fly-admin-import-run", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly admin import failed" });
  }
};
