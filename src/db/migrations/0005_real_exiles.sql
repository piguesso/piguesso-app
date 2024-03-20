ALTER TABLE "games" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "max_players" integer DEFAULT 4 NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "rounds" integer DEFAULT 3 NOT NULL;