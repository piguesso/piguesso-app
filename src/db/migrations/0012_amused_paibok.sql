ALTER TABLE "training" ALTER COLUMN "drawing" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "training" ALTER COLUMN "drawing" SET DEFAULT '[]'::json;