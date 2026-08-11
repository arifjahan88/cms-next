CREATE TABLE "landing_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_slug" varchar(32) DEFAULT 'home' NOT NULL,
	"section_id" varchar(32) NOT NULL,
	"title" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"icon" varchar(64) DEFAULT 'layout' NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"seo_title" varchar(255) DEFAULT '' NOT NULL,
	"seo_description" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "landing_sections_page_section_idx" ON "landing_sections" USING btree ("page_slug","section_id");
--> statement-breakpoint
CREATE INDEX "landing_sections_page_sort_idx" ON "landing_sections" USING btree ("page_slug","sort_order");
