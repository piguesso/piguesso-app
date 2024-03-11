CREATE TABLE IF NOT EXISTS "training" (
	"clerk_id" varchar PRIMARY KEY NOT NULL,
	"drawing" varchar NOT NULL,
	CONSTRAINT "training_clerk_id_unique" UNIQUE("clerk_id")
);
