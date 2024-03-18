ALTER TABLE "demo" ALTER COLUMN "drawing" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "demo" ALTER COLUMN "term" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "demo" ALTER COLUMN "guess" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "demo" ALTER COLUMN "term_confidence" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "demo" ADD COLUMN "host" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "demo" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "demo" ADD COLUMN "username" text NOT NULL;