import { query } from "../../db/index.js";
import { ALLOWED_ROUNDS } from "../../lib/fly-scoring.js";
import { cleanDisplayName, cleanPlayerId, emptyResponse, isGuestDisplayName, jsonResponse, logError, logMetric, readRequestJson } from "./_shared.js";

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });

  try {
    const body = await readRequestJson(request);
    const rounds = Math.trunc(Number(body.rounds) || 0);
    if (!ALLOWED_ROUNDS.includes(rounds)) return jsonResponse(400, { error: "invalid round count" });

    const runId = crypto.randomUUID();
    const token = crypto.randomUUID();
    const playerId = cleanPlayerId(body.playerId);
    const requestedName = cleanDisplayName(body.displayName);
    if (isGuestDisplayName(requestedName)) {
      logMetric("fly-run-start", "rejected guest run", { playerId, rounds });
      return jsonResponse(400, { error: "display name is required before starting an official Fly run" });
    }
    const shouldLockName = requestedName !== "Guest";

    const { rows: players } = await query(
      `insert into fly_players (player_id, display_name, display_name_locked)
       values ($1, $2, $3)
       on conflict (player_id) do update
       set display_name = case
             when fly_players.display_name_locked then fly_players.display_name
             else excluded.display_name
           end,
           display_name_locked = fly_players.display_name_locked or excluded.display_name_locked,
           updated_at = now()
       returning display_name as "displayName",
                 display_name_locked as "displayNameLocked",
                 rank_points as "rankPoints"`,
      [playerId, requestedName, shouldLockName]
    );
    const player = players[0] || { displayName: requestedName, displayNameLocked: shouldLockName, rankPoints: 0 };

    const startPayload = JSON.stringify({ lastActivityAt: new Date().toISOString(), activity: { round: 1, phase: "briefing", score: 0, techPoints: 0 } });
    const { rows } = await query(
      `insert into fly_runs (run_id, token, player_id, display_name, mode, rounds, payload)
       values ($1, $2, $3, $4, 'rocket', $5, $6::jsonb)
       returning run_id as "runId", token, player_id as "playerId", display_name as "displayName", rounds, started_at as "startedAt"`,
      [runId, token, playerId, player.displayName, rounds, startPayload]
    );
    logMetric("fly-run-start", "started run", { runId, playerId, rounds, displayName: player.displayName });
    return jsonResponse(200, { ...rows[0], player: { playerId, ...player } });
  } catch (error) {
    logError("fly-run-start", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly run start failed" });
  }
};
