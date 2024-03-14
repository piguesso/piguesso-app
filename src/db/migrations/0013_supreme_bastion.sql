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
ALTER TABLE "users" DROP CONSTRAINT "users_clerk_id_unique";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'users'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "users" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "game_slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "left_game_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_player_id_users_clerk_id_fk" FOREIGN KEY ("player_id") REFERENCES "users"("clerk_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "score";--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "round";--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "place";--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "is_winner";