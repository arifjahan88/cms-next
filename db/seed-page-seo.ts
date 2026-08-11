import { eq } from 'drizzle-orm';
import { PUBLIC_PAGES } from '@/features/dashboard/data/public-pages';
import { db } from './index';
import { pageSeo } from './schema';

export async function seedPageSeo() {
  for (const page of PUBLIC_PAGES) {
    const [existing] = await db
      .select({ id: pageSeo.id })
      .from(pageSeo)
      .where(eq(pageSeo.pageSlug, page.slug))
      .limit(1);

    if (existing) {
      console.log(`Page SEO already exists: ${page.slug}`);
      continue;
    }

    await db.insert(pageSeo).values({
      pageSlug: page.slug,
      title: page.defaultTitle,
      description: page.defaultDescription,
      noIndex: false,
    });

    console.log(`Seeded page SEO: ${page.slug}`);
  }
}
