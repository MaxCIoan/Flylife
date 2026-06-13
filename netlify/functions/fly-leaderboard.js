import { query } from "../../db/index.js";
import { json } from "./_shared.js";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "GET") return json(405, { error: "method not allowed" });

  try {
    const { rows: leaders } = await query(
      `select display_name as "displayName",
              rounds,
              final_score as "finalScore",
              elapsed_ms as "elapsedMs",
              finished_at as "finishedAt"
       from fly_runs
       where status = 'completed' and tampered = false and final_score > 0
       order by final_score desc, elapsed_ms asc, finished_at asc
       limit 20`
    );

    return json(200, { leaders });
  } catch (error) {
    console.error("fly-leaderboard failed", error);
    return json(500, { error: error instanceof Error ? error.message : "fly leaderboard failed" });
  }
};
