CREATE TABLE IF NOT EXISTS "player_scoring_round" (
	"player_id" varchar NOT NULL,
	"game_id" serial NOT NULL,
	"score" integer DEFAULT 0,
	"round_id" serial NOT NULL,
	"place" integer DEFAULT 1,
	"is_winner" boolean DEFAULT false,
	"time_used_to_complete" integer DEFAULT 0,
	"first_topic" varchar(100),
	"second_topic" varchar(100),
	"third_topic" varchar(100),
	"has_stopped_game" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "score";--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "round";--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "place";--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "is_winner";