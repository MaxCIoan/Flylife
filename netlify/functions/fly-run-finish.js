import { query } from "../../db/index.js";
import { computeFlyScore } from "../../lib/fly-scoring.js";
import { cleanDisplayName, cleanPlayerId, emptyResponse, jsonResponse, readRequestJson } from "./_shared.js";

function dateMs(value) {
  if (value instanceof Date) return value.getTime();
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });

  try {
    const body = await readRequestJson(request);
    if (!body.runId || !body.token) return jsonResponse(400, { error: "run credentials are required" });

    const { rows } = await query(
      `select run_id as "runId",
              player_id as "playerId",
              display_name as "displayName",
              started_at as "startedAt",
              status,
              final_score as "finalScore",
              elapsed_ms as "elapsedMs",
              tampered,
              tamper_reason as "tamperReason"
       from fly_runs
       where run_id = $1 and token = $2
       limit 1`,
      [body.runId, body.token]
    );
    const run = rows[0];
    if (!run) return jsonResponse(404, { error: "run not found" });
    if (run.status === "completed") {
      return jsonResponse(200, {
        finalScore: run.finalScore || 0,
        elapsedMs: run.elapsedMs || 0,
        tampered: Boolean(run.tampered),
        tamperReason: run.tamperReason || null,
        alreadySubmitted: true
      });
    }

    const finishedAt = new Date();
    const session = body.session || {};
    const playerId = run.playerId || cleanPlayerId(body.playerId || session.playerId);
    const requestedName = cleanDisplayName(body.displayName || session.displayName);
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
      [playerId, requestedName, requestedName !== "Guest"]
    );
    const playerName = players[0]?.displayName || requestedName;
    const result = computeFlyScore({
      startedMs: dateMs(run.startedAt),
      finishedMs: finishedAt.getTime(),
      session
    });

    await query(
      `update fly_runs
       set display_name = $1,
           player_id = $2,
           finished_at = $3,
           status = 'completed',
           payload = $4::jsonb,
           final_score = $5,
           elapsed_ms = $6,
           tampered = $7,
           tamper_reason = $8
       where run_id = $9`,
      [
        playerName,
        playerId,
        finishedAt,
        JSON.stringify(session),
        result.finalScore,
        result.elapsedMs,
        result.tampered,
        result.tamperReason,
        body.runId
      ]
    );

    let player = players[0] ? { playerId, ...players[0] } : null;
    if (!result.tampered && result.finalScore > 0) {
      const { rows: updatedPlayers } = await query(
        `update fly_players
         set rank_points = rank_points + $2,
             updated_at = now()
         where player_id = $1
         returning player_id as "playerId",
                   display_name as "displayName",
                   display_name_locked as "displayNameLocked",
                   rank_points as "rankPoints"`,
        [playerId, result.finalScore]
      );
      player = updatedPlayers[0] || player;
    }

    return jsonResponse(200, { ...result, player });
  } catch (error) {
    console.error("fly-run-finish failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly run finish failed" });
  }
};
