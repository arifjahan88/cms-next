import {
  type AnyPgColumn,
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const UserRole = {
  Admin: 1,
  User: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: integer('role').notNull().default(UserRole.Admin),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const NAV_MENU_SLUGS = ['main', 'footer', 'mobile'] as const;
export type NavMenuSlug = (typeof NAV_MENU_SLUGS)[number];

export const navMenus = pgTable('nav_menus', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 32 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull().default(''),
  status: varchar('status', { length: 20 }).notNull().default('published'),
  isSystem: boolean('is_system').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const navMenuItems = pgTable(
  'nav_menu_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    menuId: uuid('menu_id')
      .notNull()
      .references(() => navMenus.id, { onDelete: 'cascade' }),
    parentId: uuid('parent_id').references((): AnyPgColumn => navMenuItems.id, {
      onDelete: 'cascade',
    }),
    label: varchar('label', { length: 255 }).notNull(),
    href: varchar('href', { length: 1024 }).notNull(),
    icon: varchar('icon', { length: 64 }),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    openIn: varchar('open_in', { length: 10 }).notNull().default('same'),
    visible: boolean('visible').notNull().default(true),
    cssClass: varchar('css_class', { length: 255 }),
    rel: varchar('rel', { length: 255 }),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('nav_menu_items_menu_id_idx').on(table.menuId),
    index('nav_menu_items_menu_parent_sort_idx').on(table.menuId, table.parentId, table.sortOrder),
  ]
);

export type NavMenuRow = typeof navMenus.$inferSelect;
export type NewNavMenu = typeof navMenus.$inferInsert;
export type NavMenuItemRow = typeof navMenuItems.$inferSelect;
export type NewNavMenuItem = typeof navMenuItems.$inferInsert;

export const LANDING_SECTION_IDS = [
  'hero',
  'trustedBy',
  'services',
  'industries',
  'whyChoose',
  'caseStudies',
  'testimonials',
  'contactCta',
] as const;

export type LandingSectionId = (typeof LANDING_SECTION_IDS)[number];

export const landingSections = pgTable(
  'landing_sections',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    pageSlug: varchar('page_slug', { length: 32 }).notNull().default('home'),
    sectionId: varchar('section_id', { length: 32 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    icon: varchar('icon', { length: 64 }).notNull().default('layout'),
    visible: boolean('visible').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    content: jsonb('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('landing_sections_page_section_idx').on(table.pageSlug, table.sectionId),
    index('landing_sections_page_sort_idx').on(table.pageSlug, table.sortOrder),
  ]
);

export type LandingSectionRow = typeof landingSections.$inferSelect;
export type NewLandingSection = typeof landingSections.$inferInsert;
