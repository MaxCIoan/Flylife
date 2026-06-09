CREATE TABLE IF NOT EXISTS "fly_runs" (
  "id" serial PRIMARY KEY,
  "run_id" text NOT NULL UNIQUE,
  "token" text NOT NULL,
  "display_name" text DEFAULT 'Guest' NOT NULL,
  "mode" text DEFAULT 'rocket' NOT NULL,
  "rounds" integer DEFAULT 10 NOT NULL,
  "started_at" timestamp DEFAULT now() NOT NULL,
  "finished_at" timestamp,
  "status" text DEFAULT 'active' NOT NULL,
  "payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "final_score" integer DEFAULT 0 NOT NULL,
  "elapsed_ms" integer DEFAULT 0 NOT NULL,
  "tampered" boolean DEFAULT false NOT NULL,
  "tamper_reason" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "fly_runs_leaderboard_idx" ON "fly_runs" ("status", "tampered", "final_score", "elapsed_ms");
