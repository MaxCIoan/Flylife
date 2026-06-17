import { query } from "../../db/index.js";
import { cleanDisplayName, cleanPlayerId, cleanRankPoints, emptyResponse, jsonResponse, readRequestJson } from "./_shared.js";

function playerFromRow(row) {
  if (!row) return null;
  return {
    playerId: row.playerId,
    displayName: row.displayName || "Guest",
    displayNameLocked: Boolean(row.displayNameLocked),
    rankPoints: Number(row.rankPoints) || 0,
    profile: row.profile || {},
    updatedAt: row.updatedAt
  };
}

function compactProfilePayload(value) {
  const profile = value && typeof value === "object" ? value : {};
  return {
    displayName: cleanDisplayName(profile.displayName),
    rankPoints: cleanRankPoints(profile.rankPoints),
    recentSpeedRuns: Array.isArray(profile.recentSpeedRuns) ? profile.recentSpeedRuns.slice(0, 8) : [],
    recentFlyRuns: Array.isArray(profile.recentFlyRuns) ? profile.recentFlyRuns.slice(0, 8) : []
  };
}

async function readPlayer(playerId) {
  await query(
    `insert into fly_players (player_id)
     values ($1)
     on conflict (player_id) do nothing`,
    [playerId]
  );
  const { rows } = await query(
    `select player_id as "playerId",
            display_name as "displayName",
            display_name_locked as "displayNameLocked",
            rank_points as "rankPoints",
            profile_payload as "profile",
            updated_at as "updatedAt"
     from fly_players
     where player_id = $1
     limit 1`,
    [playerId]
  );
  return playerFromRow(rows[0]);
}

async function writePlayer({ playerId, displayName, rankPoints, profile }) {
  const requestedName = cleanDisplayName(displayName);
  const shouldLockName = requestedName !== "Guest";
  const payload = compactProfilePayload(profile);
  const { rows } = await query(
    `insert into fly_players (player_id, display_name, display_name_locked, rank_points, profile_payload)
     values ($1, $2, $3, $4, $5::jsonb)
     on conflict (player_id) do update
     set display_name = case
           when fly_players.display_name_locked then fly_players.display_name
           else excluded.display_name
         end,
         display_name_locked = fly_players.display_name_locked or excluded.display_name_locked,
         rank_points = greatest(fly_players.rank_points, excluded.rank_points),
         profile_payload = excluded.profile_payload,
         updated_at = now()
     returning player_id as "playerId",
               display_name as "displayName",
               display_name_locked as "displayNameLocked",
               rank_points as "rankPoints",
               profile_payload as "profile",
               updated_at as "updatedAt"`,
    [playerId, requestedName, shouldLockName, cleanRankPoints(rankPoints), JSON.stringify(payload)]
  );
  return playerFromRow(rows[0]);
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();

  try {
    if (request.method === "GET") {
      const url = new URL(request.url);
      const playerId = cleanPlayerId(url.searchParams.get("playerId"));
      return jsonResponse(200, { player: await readPlayer(playerId) });
    }

    if (request.method === "POST") {
      const body = await readRequestJson(request);
      const player = await writePlayer({
        playerId: cleanPlayerId(body.playerId),
        displayName: body.displayName,
        rankPoints: body.rankPoints,
        profile: body.profile
      });
      return jsonResponse(200, { player });
    }

    return jsonResponse(405, { error: "method not allowed" });
  } catch (error) {
    console.error("fly-player-profile failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly player profile failed" });
  }
};
