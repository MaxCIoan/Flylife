import { query } from "../../db/index.js";
import { emptyResponse, jsonResponse, logError, logMetric } from "./_shared.js";

const FLY_TRACE_POINT_LIMIT = 360;

function authorized(request) {
  const token = process.env.FLY_ADMIN_TOKEN;
  if (!token) return false;
  return request.headers.get("x-fly-admin-token") === token;
}

function compactTrace(trace = []) {
  const points = (Array.isArray(trace) ? trace : [])
    .map((point) => ({
      x: Math.round(Number(point?.x)),
      y: Math.round(Number(point?.y)),
      wrap: Boolean(point?.wrap),
      ...(point?.kind ? { kind: point.kind } : {})
    }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
  if (points.length <= FLY_TRACE_POINT_LIMIT) return points;
  const stride = Math.max(1, Math.ceil(points.length / FLY_TRACE_POINT_LIMIT));
  return points.filter((point, index) => (
    index === 0
    || index === points.length - 1
    || point.kind
    || index % stride === 0
  )).slice(0, FLY_TRACE_POINT_LIMIT);
}

function compactPayload(payload = {}) {
  if (!payload || typeof payload !== "object") return {};
  return {
    ...payload,
    logs: Array.isArray(payload.logs)
      ? payload.logs.map((log) => ({
        ...log,
        trace: compactTrace(log.trace),
        depotMarkers: Array.isArray(log.depotMarkers) ? log.depotMarkers.slice(0, 8) : [],
        landings: Array.isArray(log.landings) ? log.landings.slice(0, 8) : []
      }))
      : []
  };
}

async function listPlayers() {
  const { rows } = await query(
    `with player_rows as (
       select player_id as "playerId",
              display_name as "displayName",
              display_name_locked as "displayNameLocked",
              rank_points as "rankPoints",
              created_at as "createdAt",
              updated_at as "updatedAt"
       from fly_players
       union
       select coalesce(nullif(player_id, ''), 'legacy-' || md5(lower(display_name))) as "playerId",
              max(display_name) as "displayName",
              false as "displayNameLocked",
              0::bigint as "rankPoints",
              min(created_at) as "createdAt",
              max(coalesce(finished_at, created_at)) as "updatedAt"
       from fly_runs r
       where not exists (
         select 1 from fly_players p
         where p.player_id = r.player_id
            or lower(p.display_name) = lower(r.display_name)
       )
       group by coalesce(nullif(player_id, ''), 'legacy-' || md5(lower(display_name))), lower(display_name)
     ),
     run_stats as (
       select case
                when lower(display_name) in ('guest', 'anonymous', 'player') then coalesce(nullif(player_id, ''), 'guest-' || md5(run_id))
                else lower(display_name)
              end as key,
              count(*)::int as "runCount",
              count(*) filter (where status = 'completed')::int as "completedRuns",
              max(final_score) filter (where status = 'completed' and tampered = false) as "bestScore",
              max(coalesce(finished_at, created_at)) as "lastRunAt"
       from fly_runs
       group by key
     )
     select p.*,
            coalesce(s."runCount", 0) as "runCount",
            coalesce(s."completedRuns", 0) as "completedRuns",
            coalesce(s."bestScore", 0) as "bestScore",
            s."lastRunAt"
     from player_rows p
     left join run_stats s on s.key = case
       when lower(p."displayName") in ('guest', 'anonymous', 'player') then p."playerId"
       else lower(p."displayName")
     end
     order by coalesce(s."bestScore", 0) desc, coalesce(s."lastRunAt", p."updatedAt") desc
     limit 250`
  );
  return rows;
}

async function listRuns({ playerId, displayName }) {
  const { rows } = await query(
    `select run_id as "runId",
            player_id as "playerId",
            display_name as "displayName",
            status,
            rounds,
            coalesce((payload->>'selectedRounds')::int, rounds) as "selectedRounds",
            coalesce((payload->>'completedRounds')::int, 0) as "completedRounds",
            final_score as "finalScore",
            elapsed_ms as "elapsedMs",
            tampered,
            tamper_reason as "tamperReason",
            started_at as "startedAt",
            finished_at as "finishedAt",
            created_at as "createdAt",
            payload
     from fly_runs
     where ($1 <> '' and player_id = $1)
        or ($2 <> '' and lower(display_name) = lower($2))
     order by coalesce(finished_at, created_at) desc
     limit 100`,
    [String(playerId || ""), String(displayName || "")]
  );
  return rows.map((run) => ({
    ...run,
    payload: compactPayload(run.payload)
  }));
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "GET") return jsonResponse(405, { error: "method not allowed" });
  if (!authorized(request)) return jsonResponse(403, { error: "admin token required" });

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "players";
    if (type === "players") {
      const players = await listPlayers();
      logMetric("fly-admin-data", "listed players", { count: players.length });
      return jsonResponse(200, { players });
    }
    if (type === "runs") {
      const runs = await listRuns({
        playerId: url.searchParams.get("playerId") || "",
        displayName: url.searchParams.get("displayName") || ""
      });
      logMetric("fly-admin-data", "listed runs", { count: runs.length });
      return jsonResponse(200, { runs });
    }
    return jsonResponse(400, { error: "unsupported admin data type" });
  } catch (error) {
    logError("fly-admin-data", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly admin data failed" });
  }
};
