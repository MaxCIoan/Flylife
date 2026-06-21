import { query } from "../../db/index.js";
import { emptyResponse, jsonResponse, logError, logMetric, readRequestJson } from "./_shared.js";

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });

  try {
    const body = await readRequestJson(request);
    if (!body.runId || !body.token) return jsonResponse(400, { error: "run credentials are required" });
    const activity = body.activity && typeof body.activity === "object" ? body.activity : {};
    const payload = {
      lastActivityAt: new Date().toISOString(),
      activity: {
        round: Math.trunc(Number(activity.round) || 0),
        phase: String(activity.phase || "").slice(0, 24),
        score: Math.max(0, Math.round(Number(activity.score) || 0)),
        techPoints: Math.max(0, Math.round(Number(activity.techPoints) || 0))
      }
    };
    const { rowCount } = await query(
      `update fly_runs
       set payload = payload || $3::jsonb
       where run_id = $1 and token = $2 and status = 'active'`,
      [body.runId, body.token, JSON.stringify(payload)]
    );
    if (!rowCount) return jsonResponse(404, { error: "active run not found" });
    logMetric("fly-run-ping", "activity heartbeat", { runId: body.runId, round: payload.activity.round, phase: payload.activity.phase });
    return jsonResponse(200, { ok: true, lastActivityAt: payload.lastActivityAt });
  } catch (error) {
    logError("fly-run-ping", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly run ping failed" });
  }
};
