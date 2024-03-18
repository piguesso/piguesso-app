DO $$ BEGIN
 CREATE TYPE "game_state" AS ENUM('waiting', 'playing', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friends" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"friend_id" varchar NOT NULL,
	"created_at" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "game_state" DEFAULT 'waiting',
	"game_slug" varchar NOT NULL,
	"winner_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_scoring_round" (
	"id" serial PRIMARY KEY NOT NULL,
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
CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" varchar NOT NULL,
	"game_id" serial NOT NULL,
	"is_host" boolean DEFAULT false,
	"left_game_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" serial NOT NULL,
	"round_number" integer NOT NULL,
	"topic" varchar(100) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_scoring" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" varchar NOT NULL,
	"total_xp" integer DEFAULT 0,
	"highest_score_game" integer DEFAULT 0,
	"highest_score_round" integer DEFAULT 0,
	"games_played" integer DEFAULT 0,
	"games_won" integer DEFAULT 0,
	"games_lost" integer DEFAULT 0,
	"games_top3" integer DEFAULT 0,
	"games_bottom3" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "training" (
	"clerk_id" varchar PRIMARY KEY NOT NULL,
	"drawing" jsonb NOT NULL,
	CONSTRAINT "training_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"clerk_id" varchar PRIMARY KEY NOT NULL,
	"biography" varchar(1000),
	"tag" varchar NOT NULL,
	CONSTRAINT "users_tag_unique" UNIQUE("tag")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_player_id_users_clerk_id_fk" FOREIGN KEY ("player_id") REFERENCES "users"("clerk_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
