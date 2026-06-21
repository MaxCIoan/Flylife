import { query } from "../../db/index.js";
import { cleanDisplayName, cleanPlayerId, emptyResponse, isGuestDisplayName, jsonResponse, logError, logMetric } from "./_shared.js";

function authorized(request) {
  const token = process.env.FLY_ADMIN_TOKEN;
  if (!token) return false;
  return request.headers.get("x-fly-admin-token") === token;
}

async function readBody(request) {
  const text = await request.text();
  return text ? JSON.parse(text) : {};
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });
  if (!authorized(request)) return jsonResponse(403, { error: "admin token required" });

  try {
    const body = await readBody(request);
    const action = String(body.action || "rename").toLowerCase();
    if (action !== "rename") return jsonResponse(400, { error: "unsupported admin player action" });

    const playerId = cleanPlayerId(body.playerId);
    const displayName = cleanDisplayName(body.displayName);
    if (isGuestDisplayName(displayName)) return jsonResponse(400, { error: "display name is required" });

    if (!body.force) {
      const { rows: conflicts } = await query(
        `select player_id as "playerId", display_name as "displayName"
         from fly_players
         where lower(display_name) = lower($1)
           and player_id <> $2
         limit 1`,
        [displayName, playerId]
      );
      if (conflicts[0]) {
        return jsonResponse(409, { error: "display name is already used by another player", conflict: conflicts[0] });
      }
    }

    const { rows } = await query(
      `insert into fly_players (player_id, display_name, display_name_locked)
       values ($1, $2, true)
       on conflict (player_id) do update
       set display_name = excluded.display_name,
           display_name_locked = true,
           updated_at = now()
       returning player_id as "playerId",
                 display_name as "displayName",
                 display_name_locked as "displayNameLocked",
                 rank_points as "rankPoints",
                 profile_payload as "profile",
                 updated_at as "updatedAt"`,
      [playerId, displayName]
    );

    const { rowCount: runsUpdated } = await query(
      `update fly_runs
       set display_name = $2
       where player_id = $1`,
      [playerId, displayName]
    );

    logMetric("fly-admin-player", "renamed player", { playerId, displayName, runsUpdated });
    return jsonResponse(200, { ok: true, player: rows[0], runsUpdated });
  } catch (error) {
    logError("fly-admin-player", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly admin player failed" });
  }
};
