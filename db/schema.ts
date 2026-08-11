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

export const HOME_SECTION_IDS = [
  'hero',
  'trustedBy',
  'services',
  'industries',
  'whyChoose',
  'caseStudies',
  'testimonials',
  'contactCta',
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

/** @deprecated Use page-configs section IDs per page slug instead. */
export const LANDING_SECTION_IDS = HOME_SECTION_IDS;
export type LandingSectionId = HomeSectionId;

export const ContentStatus = {
  Draft: 'draft',
  Published: 'published',
} as const;

export type ContentStatusValue = (typeof ContentStatus)[keyof typeof ContentStatus];

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

export const pageSeo = pgTable('page_seo', {
  id: uuid('id').defaultRandom().primaryKey(),
  pageSlug: varchar('page_slug', { length: 32 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  ogImage: varchar('og_image', { length: 1024 }),
  noIndex: boolean('no_index').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type PageSeoRow = typeof pageSeo.$inferSelect;
export type NewPageSeo = typeof pageSeo.$inferInsert;

export const blogPosts = pgTable(
  'blog_posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    excerpt: text('excerpt').notNull(),
    body: text('body').notNull().default(''),
    category: varchar('category', { length: 100 }).notNull(),
    author: varchar('author', { length: 255 }).notNull().default(''),
    image: varchar('image', { length: 1024 }).notNull().default(''),
    readTime: varchar('read_time', { length: 32 }).notNull().default('5 min'),
    featured: boolean('featured').notNull().default(false),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    seoTitle: varchar('seo_title', { length: 255 }),
    seoDescription: text('seo_description'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('blog_posts_status_idx').on(table.status)]
);

export type BlogPostRow = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export const caseStudies = pgTable(
  'case_studies',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    image: varchar('image', { length: 1024 }).notNull().default(''),
    challenge: text('challenge').notNull().default(''),
    solution: text('solution').notNull().default(''),
    techStack: jsonb('tech_stack').notNull().default([]),
    metrics: jsonb('metrics').notNull().default([]),
    featured: boolean('featured').notNull().default(false),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    seoTitle: varchar('seo_title', { length: 255 }),
    seoDescription: text('seo_description'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('case_studies_status_idx').on(table.status)]
);

export type CaseStudyRow = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;

export const jobOpenings = pgTable(
  'job_openings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    department: varchar('department', { length: 100 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    description: text('description').notNull(),
    applyHref: varchar('apply_href', { length: 1024 }).notNull().default('/careers#apply'),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('job_openings_status_idx').on(table.status)]
);

export type JobOpeningRow = typeof jobOpenings.$inferSelect;
export type NewJobOpening = typeof jobOpenings.$inferInsert;

export const portfolioProjects = pgTable(
  'portfolio_projects',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    image: varchar('image', { length: 1024 }).notNull().default(''),
    href: varchar('href', { length: 1024 }).notNull().default('/case-studies'),
    projectDate: varchar('project_date', { length: 32 }).notNull().default(''),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('portfolio_projects_status_idx').on(table.status)]
);

export type PortfolioProjectRow = typeof portfolioProjects.$inferSelect;
export type NewPortfolioProject = typeof portfolioProjects.$inferInsert;

export const contactMessages = pgTable(
  'contact_messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }),
    phone: varchar('phone', { length: 64 }),
    subject: varchar('subject', { length: 255 }).notNull(),
    message: text('message').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('contact_messages_status_created_idx').on(table.status, table.createdAt)]
);

export type ContactMessageRow = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;

export const consultationBookings = pgTable(
  'consultation_bookings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 64 }).notNull(),
    service: varchar('service', { length: 100 }).notNull(),
    projectType: varchar('project_type', { length: 32 }).notNull(),
    description: text('description').notNull(),
    budget: varchar('budget', { length: 64 }),
    preferredDate: varchar('preferred_date', { length: 32 }),
    preferredTime: varchar('preferred_time', { length: 32 }),
    referral: varchar('referral', { length: 64 }),
    status: varchar('status', { length: 20 }).notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('consultation_bookings_status_created_idx').on(table.status, table.createdAt),
  ]
);

export type ConsultationBookingRow = typeof consultationBookings.$inferSelect;
export type NewConsultationBooking = typeof consultationBookings.$inferInsert;
