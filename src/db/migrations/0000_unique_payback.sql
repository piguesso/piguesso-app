DO $$ BEGIN
 CREATE TYPE "game_state" AS ENUM('waiting', 'playing', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friends" (
	"user_id" varchar NOT NULL,
	"friend_id" varchar NOT NULL,
	"created_at" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "game_state" DEFAULT 'waiting',
	"winner_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"player_id" varchar NOT NULL,
	"game_id" serial NOT NULL,
	"score" integer DEFAULT 0,
	"round" integer DEFAULT 1,
	"place" integer DEFAULT 1,
	"is_host" boolean DEFAULT false,
	"is_winner" boolean DEFAULT false
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
	"player_id" varchar NOT NULL,
	"total_xp" integer DEFAULT 0,
	"highest_score_game" integer DEFAULT 0,
	"highest_score_round" integer DEFAULT 0,
	"games_played" integer DEFAULT 0,
	"games_won" integer DEFAULT 0,
	"games_lost" integer DEFAULT 0,
	"games_top3" integer DEFAULT 0,
	"games_bottom3" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"clerk_id" varchar NOT NULL,
	"biography" varchar(1000),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
