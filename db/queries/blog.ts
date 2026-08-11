import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { blogPosts, type BlogPostRow, type NewBlogPost } from '@/db/schema';

export const BLOG_CACHE_TAG = 'blog';

export function blogSlugTag(slug: string) {
  return `blog:${slug}`;
}

export type BlogPostDto = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  featured: boolean;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: Date | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: BlogPostRow): BlogPostDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    category: row.category,
    author: row.author,
    image: row.image,
    readTime: row.readTime,
    featured: row.featured,
    status: row.status,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    publishedAt: row.publishedAt,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listAdminBlogPosts() {
  const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
  return rows.map(serialize);
}

export async function listPublishedBlogPosts() {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.publishedAt), asc(blogPosts.sortOrder));
  return rows.map(serialize);
}

export async function getBlogPostById(id: string) {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return row ? serialize(row) : null;
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')))
    .limit(1);
  return row ? serialize(row) : null;
}

export async function createBlogPost(values: NewBlogPost) {
  const [row] = await db.insert(blogPosts).values(values).returning();
  return row ? serialize(row) : null;
}

export async function updateBlogPost(id: string, patch: Partial<NewBlogPost>) {
  const [row] = await db
    .update(blogPosts)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
    .returning();
  return row ? serialize(row) : null;
}

export async function deleteBlogPost(id: string) {
  const [row] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
  return row ? serialize(row) : null;
}

export async function listFeaturedBlogPosts() {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.status, 'published'), eq(blogPosts.featured, true)))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(1);
  return rows.map(serialize);
}
