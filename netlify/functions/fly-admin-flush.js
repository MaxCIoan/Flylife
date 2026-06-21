import { query } from "../../db/index.js";
import { emptyResponse, jsonResponse, logError, logMetric } from "./_shared.js";

function authorized(request) {
  const token = process.env.FLY_ADMIN_TOKEN;
  if (!token) return false;
  return request.headers.get("x-fly-admin-token") === token;
}

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });
  if (!authorized(request)) return jsonResponse(403, { error: "admin token required" });

  try {
    const { rowCount: runsDeleted } = await query("delete from fly_runs");
    const { rowCount: playersDeleted } = await query("delete from fly_players");
    logMetric("fly-admin-flush", "flushed fly database", { runsDeleted, playersDeleted });
    return jsonResponse(200, { ok: true, runsDeleted, playersDeleted });
  } catch (error) {
    logError("fly-admin-flush", "failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly admin flush failed" });
  }
};
