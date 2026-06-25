import { query } from "../../db/index.js";
import { emptyResponse, jsonResponse, logError, logMetric } from "./_shared.js";

const FLY_TRACE_POINT_LIMIT = 720;
const PUBLIC_SCORE_RESET_AT = "2026-06-25T20:12:00Z";

function cleanSearch(value) {
  return String(value || "")
    .replace(/[^\w \-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 32);
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
        bonusMarkers: Array.isArray(log.bonusMarkers) ? log.bonusMarkers.slice(0, 8) : [],
        landings: Array.isArray(log.landings) ? log.landings.slice(0, 8) : []
      }))
      : []
  };
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "GET") return jsonResponse(405, { error: "method not allowed" });

  try {
    const url = new URL(request.url);
    const search = cleanSearch(url.searchParams.get("q"));
    const limit = Math.max(1, Math.min(80, Number(url.searchParams.get("limit")) || 40));
    const runParams = [limit, PUBLIC_SCORE_RESET_AT];
    const playerParams = [Math.min(40, limit), PUBLIC_SCORE_RESET_AT];
    let runSearchClause = "";
    let playerSearchClause = "";
    if (search) {
      runParams.push(`%${search.toLowerCase()}%`);
      playerParams.push(`%${search.toLowerCase()}%`);
      runSearchClause = `and (lower(display_name) like $${runParams.length} or lower(player_id) like $${runParams.length})`;
      playerSearchClause = `where updated_at >= $2::timestamptz
        and lower(display_name) not like 'guest%'
        and lower(display_name) not like 'anonymous%'
        and lower(display_name) not like 'player%'
        and lower(display_name) not in ('codexprobe', 'codexpartialprobe')
        and (lower(display_name) like $${playerParams.length} or lower(player_id) like $${playerParams.length})`;
    } else {
      playerSearchClause = `where updated_at >= $2::timestamptz
        and lower(display_name) not like 'guest%'
        and lower(display_name) not like 'anonymous%'
        and lower(display_name) not like 'player%'
        and lower(display_name) not in ('codexprobe', 'codexpartialprobe')`;
    }
    const [{ rows }, { rows: playerRows }] = await Promise.all([
      query(
      `select run_id as "runId",
              player_id as "playerId",
              display_name as "displayName",
              rounds,
              coalesce((payload->>'selectedRounds')::int, rounds) as "selectedRounds",
              coalesce((payload->>'completedRounds')::int, 0) as "completedRounds",
              coalesce(payload->>'planeClass', '') as "planeClass",
              final_score as "finalScore",
              elapsed_ms as "elapsedMs",
              finished_at as "finishedAt",
              payload
       from fly_runs
       where status = 'completed'
         and tampered = false
         and finished_at >= $2::timestamptz
         and lower(display_name) not like 'guest%'
         and lower(display_name) not like 'anonymous%'
         and lower(display_name) not like 'player%'
         and lower(display_name) not in ('codexprobe', 'codexpartialprobe')
         ${runSearchClause}
       order by finished_at desc, final_score desc
       limit $1`,
        runParams
      ),
      query(
        `select player_id as "playerId",
                display_name as "displayName",
                rank_points as "rankPoints",
                profile_payload as "profile",
                updated_at as "updatedAt"
         from fly_players
         ${playerSearchClause}
         order by updated_at desc
         limit $1`,
        playerParams
      )
    ]);
    const runs = rows.map((run) => ({
      ...run,
      payload: compactPayload(run.payload)
    }));
    const players = new Map();
    playerRows.forEach((player) => {
      const key = String(player.displayName || player.playerId || "").toLowerCase();
      players.set(key, {
        playerId: player.playerId,
        displayName: player.displayName,
        rankPoints: Number(player.rankPoints) || 0,
        profile: player.profile || {},
        runs: 0,
        bestScore: 0,
        totalScore: 0,
        latestFinishedAt: player.updatedAt
      });
    });
    runs.forEach((run) => {
      const key = String(run.displayName || run.playerId || "").toLowerCase();
      const current = players.get(key) || {
        playerId: run.playerId,
        displayName: run.displayName,
        runs: 0,
        bestScore: 0,
        totalScore: 0,
        latestFinishedAt: run.finishedAt
      };
      current.runs += 1;
      current.bestScore = Math.max(current.bestScore, Number(run.finalScore) || 0);
      current.totalScore += Number(run.finalScore) || 0;
      if (new Date(run.finishedAt) > new Date(current.latestFinishedAt)) current.latestFinishedAt = run.finishedAt;
      players.set(key, current);
    });
    logMetric("fly-public-runs", "loaded public runs", { count: runs.length, search: search || "" });
    return jsonResponse(200, { players: [...players.values()], runs });
  } catch (error) {
    logError("fly-public-runs", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly public runs failed" });
  }
};
