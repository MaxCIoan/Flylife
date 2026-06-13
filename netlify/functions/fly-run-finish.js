import { query } from "../../db/index.js";
import { computeFlyScore } from "../../lib/fly-scoring.js";
import { cleanDisplayName, json, readJson } from "./_shared.js";

function dateMs(value) {
  if (value instanceof Date) return value.getTime();
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "method not allowed" });

  try {
    const body = await readJson(event);
    if (!body.runId || !body.token) return json(400, { error: "run credentials are required" });

    const { rows } = await query(
      `select run_id as "runId", started_at as "startedAt"
       from fly_runs
       where run_id = $1 and token = $2
       limit 1`,
      [body.runId, body.token]
    );
    const run = rows[0];
    if (!run) return json(404, { error: "run not found" });

    const finishedAt = new Date();
    const session = body.session || {};
    const result = computeFlyScore({
      startedMs: dateMs(run.startedAt),
      finishedMs: finishedAt.getTime(),
      session
    });

    await query(
      `update fly_runs
       set display_name = $1,
           finished_at = $2,
           status = 'completed',
           payload = $3::jsonb,
           final_score = $4,
           elapsed_ms = $5,
           tampered = $6,
           tamper_reason = $7
       where run_id = $8`,
      [
        cleanDisplayName(body.displayName || session.displayName),
        finishedAt,
        JSON.stringify(session),
        result.finalScore,
        result.elapsedMs,
        result.tampered,
        result.tamperReason,
        body.runId
      ]
    );

    return json(200, result);
  } catch (error) {
    console.error("fly-run-finish failed", error);
    return json(500, { error: error instanceof Error ? error.message : "fly run finish failed" });
  }
};
