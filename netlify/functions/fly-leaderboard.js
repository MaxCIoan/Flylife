import { query } from "../../db/index.js";
import { emptyResponse, jsonResponse, logError, logMetric } from "./_shared.js";

const FLY_TRACE_POINT_LIMIT = 720;

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
  const compacted = points.filter((point, index) => (
    index === 0
    || index === points.length - 1
    || point.kind
    || index % stride === 0
  ));
  return compacted.slice(0, FLY_TRACE_POINT_LIMIT);
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

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "GET") return jsonResponse(405, { error: "method not allowed" });

  try {
    const { rows } = await query(
      `select *
       from (
         select run_id as "runId",
                player_id as "playerId",
                display_name as "displayName",
                rounds,
                coalesce((payload->>'selectedRounds')::int, rounds) as "selectedRounds",
                coalesce((payload->>'completedRounds')::int, 0) as "completedRounds",
                coalesce(payload->>'planeClass', '') as "planeClass",
                final_score as "finalScore",
                elapsed_ms as "elapsedMs",
                finished_at as "finishedAt",
                payload,
                row_number() over (
                  partition by lower(display_name)
                  order by final_score desc, elapsed_ms asc, finished_at asc
                ) as rank_for_player
         from fly_runs
         where status = 'completed'
           and tampered = false
           and final_score > 0
           and coalesce(jsonb_array_length(payload->'logs'), 0) > 0
           and lower(display_name) not in ('guest', 'anonymous', 'player', 'codexprobe', 'codexpartialprobe')
       ) ranked
       where rank_for_player = 1
       order by "finalScore" desc, "elapsedMs" asc, "finishedAt" asc
       limit 20`
    );
    const leaders = rows.map((leader) => ({
      ...leader,
      payload: compactPayload(leader.payload)
    }));
    logMetric("fly-leaderboard", "loaded leaders", { count: leaders.length });
    return jsonResponse(200, { leaders });
  } catch (error) {
    logError("fly-leaderboard", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly leaderboard failed" });
  }
};
