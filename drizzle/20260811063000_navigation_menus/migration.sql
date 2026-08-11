CREATE TABLE IF NOT EXISTS "nav_menus" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(32) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"status" varchar(20) DEFAULT 'published' NOT NULL,
	"is_system" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nav_menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"menu_id" uuid NOT NULL,
	"parent_id" uuid,
	"label" varchar(255) NOT NULL,
	"href" varchar(1024) NOT NULL,
	"icon" varchar(64),
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"open_in" varchar(10) DEFAULT 'same' NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"css_class" varchar(255),
	"rel" varchar(255),
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nav_menu_items" ADD CONSTRAINT "nav_menu_items_menu_id_nav_menus_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."nav_menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nav_menu_items" ADD CONSTRAINT "nav_menu_items_parent_id_nav_menu_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nav_menu_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nav_menu_items_menu_id_idx" ON "nav_menu_items" USING btree ("menu_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nav_menu_items_menu_parent_sort_idx" ON "nav_menu_items" USING btree ("menu_id","parent_id","sort_order");
