import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { pageSeo, type PageSeoRow } from '@/db/schema';
import { getPublicPage, type PageSlug } from '@/features/dashboard/data/public-pages';
import { safeDbQuery } from '@/lib/db-safe';

export const SEO_CACHE_TAG = 'page-seo';

export function seoPageTag(slug: string) {
  return `page-seo:${slug}`;
}

export async function getAllPageSeo(): Promise<PageSeoRow[]> {
  return db.select().from(pageSeo).orderBy(asc(pageSeo.pageSlug));
}

export async function getPublicPageSeo(pageSlug: PageSlug) {
  const defaults = getPublicPage(pageSlug);
  const fallback = defaults
    ? {
        pageSlug,
        title: defaults.defaultTitle,
        description: defaults.defaultDescription,
        ogImage: null as string | null,
        noIndex: false,
      }
    : null;

  const row = await safeDbQuery(async () => {
    const [result] = await db
      .select()
      .from(pageSeo)
      .where(eq(pageSeo.pageSlug, pageSlug))
      .limit(1);
    return result ?? null;
  }, null);

  if (!row) return fallback;
  return row;
}

export async function upsertPageSeo(
  pageSlug: PageSlug,
  patch: {
    title?: string;
    description?: string;
    ogImage?: string | null;
    noIndex?: boolean;
  }
) {
  const [existing] = await db
    .select()
    .from(pageSeo)
    .where(eq(pageSeo.pageSlug, pageSlug))
    .limit(1);

  if (existing) {
    const [updated] = await db
      .update(pageSeo)
      .set({
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.description !== undefined ? { description: patch.description } : {}),
        ...(patch.ogImage !== undefined ? { ogImage: patch.ogImage } : {}),
        ...(patch.noIndex !== undefined ? { noIndex: patch.noIndex } : {}),
        updatedAt: new Date(),
      })
      .where(eq(pageSeo.pageSlug, pageSlug))
      .returning();
    return updated ?? null;
  }

  const defaults = getPublicPage(pageSlug);
  const [created] = await db
    .insert(pageSeo)
    .values({
      pageSlug,
      title: patch.title ?? defaults?.defaultTitle ?? pageSlug,
      description: patch.description ?? defaults?.defaultDescription ?? '',
      ogImage: patch.ogImage ?? null,
      noIndex: patch.noIndex ?? false,
    })
    .returning();
  return created ?? null;
}
