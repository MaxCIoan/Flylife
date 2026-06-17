CREATE TABLE IF NOT EXISTS "fly_players" (
  "player_id" text PRIMARY KEY,
  "display_name" text DEFAULT 'Guest' NOT NULL,
  "display_name_locked" boolean DEFAULT false NOT NULL,
  "rank_points" bigint DEFAULT 0 NOT NULL,
  "profile_payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "fly_runs" ADD COLUMN IF NOT EXISTS "player_id" text;

CREATE INDEX IF NOT EXISTS "fly_players_rank_idx" ON "fly_players" ("rank_points" DESC);
CREATE INDEX IF NOT EXISTS "fly_runs_player_idx" ON "fly_runs" ("player_id", "finished_at");
