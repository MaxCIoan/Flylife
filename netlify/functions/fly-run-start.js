import { query } from "../../db/index.js";
import { ALLOWED_ROUNDS } from "../../lib/fly-scoring.js";
import { cleanDisplayName, json, readJson } from "./_shared.js";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "method not allowed" });

  try {
    const body = await readJson(event);
    const rounds = Math.trunc(Number(body.rounds) || 0);
    if (!ALLOWED_ROUNDS.includes(rounds)) return json(400, { error: "invalid round count" });

    const runId = crypto.randomUUID();
    const token = crypto.randomUUID();
    const displayName = cleanDisplayName(body.displayName);

    const { rows } = await query(
      `insert into fly_runs (run_id, token, display_name, mode, rounds, payload)
       values ($1, $2, $3, 'rocket', $4, '{}'::jsonb)
       returning run_id as "runId", token, display_name as "displayName", rounds, started_at as "startedAt"`,
      [runId, token, displayName, rounds]
    );

    return json(200, rows[0]);
  } catch (error) {
    console.error("fly-run-start failed", error);
    return json(500, { error: error instanceof Error ? error.message : "fly run start failed" });
  }
};
