import { query } from "../../db/index.js";
import { emptyResponse, jsonResponse } from "./_shared.js";

export default async (request) => {
  if (request.method === "OPTIONS") return emptyResponse();
  if (request.method !== "GET") return jsonResponse(405, { error: "method not allowed" });

  try {
    const { rows: leaders } = await query(
      `select display_name as "displayName",
              rounds,
              final_score as "finalScore",
              elapsed_ms as "elapsedMs",
              finished_at as "finishedAt"
       from fly_runs
       where status = 'completed' and tampered = false and final_score > 0
         and display_name <> 'CodexProbe'
       order by final_score desc, elapsed_ms asc, finished_at asc
       limit 20`
    );

    return jsonResponse(200, { leaders });
  } catch (error) {
    console.error("fly-leaderboard failed", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : "fly leaderboard failed" });
  }
};
