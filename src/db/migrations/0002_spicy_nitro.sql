ALTER TABLE "games" ALTER COLUMN "winner_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "winner_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("clerk_id");--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("tag");