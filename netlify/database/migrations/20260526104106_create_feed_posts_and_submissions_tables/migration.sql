CREATE TABLE "feed_posts" (
	"id" serial PRIMARY KEY,
	"author" text NOT NULL,
	"field" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"area" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
