import { query } from "../../db/index.js";
import { ALLOWED_ROUNDS } from "../../lib/fly-scoring.js";
import { cleanDisplayName, emptyResponse, jsonResponse, readRequestJson } from "./_shared.js";

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "POST") return jsonResponse(405, { error: "method not allowed" });

  try {
    const body = await readRequestJson(request);
    const rounds = Math.trunc(Number(body.rounds) || 0);
    if (!ALLOWED_ROUNDS.includes(rounds)) return jsonResponse(400, { error: "invalid round count" });

    const runId = crypto.randomUUID();
    const token = crypto.randomUUID();
    const displayName = cleanDisplayName(body.displayName);

    const { rows } = await query(
      `insert into fly_runs (run_id, token, display_name, mode, rounds, payload)
       values ($1, $2, $3, 'rocket', $4, '{}'::jsonb)
       returning run_id as "runId", token, display_name as "displayName", rounds, started_at as "startedAt"`,
      [runId, token, displayName, rounds]
    );

    return jsonResponse(200, rows[0]);
  } catch (error) {
    console.error("fly-run-start failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly run start failed" });
  }
};
