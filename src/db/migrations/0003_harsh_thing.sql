CREATE TABLE IF NOT EXISTS "demo" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" varchar NOT NULL,
	"drawing" jsonb,
	"term" integer,
	"guess" integer,
	"term_confidence" numeric,
	"host" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "demo_clerk_id_unique" UNIQUE("clerk_id")
);
