ALTER TABLE "users" ADD COLUMN "tag" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tag_unique" UNIQUE("tag");