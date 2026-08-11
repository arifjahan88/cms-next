import { and, eq } from 'drizzle-orm';
import { createPageDocument } from '@/features/dashboard/data/page-seeds';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import { db } from './index';
import { landingSections } from './schema';

export async function seedAllPageSections() {
  const slugs: PageSlug[] = [
    'home',
    'about',
    'services',
    'industries',
    'technologies',
    'careers',
    'portfolio',
    'blog',
    'case-studies',
    'contact',
    'book-consultation',
  ];

  for (const pageSlug of slugs) {
    const doc = createPageDocument(pageSlug);

    for (let i = 0; i < doc.sections.length; i++) {
      const meta = doc.sections[i]!;
      const sectionId = meta.id;

      const [existing] = await db
        .select({ id: landingSections.id })
        .from(landingSections)
        .where(
          and(
            eq(landingSections.pageSlug, pageSlug),
            eq(landingSections.sectionId, sectionId)
          )
        )
        .limit(1);

      if (existing) {
        console.log(`Page section already exists: ${pageSlug}/${sectionId}`);
        continue;
      }

      await db.insert(landingSections).values({
        pageSlug,
        sectionId,
        title: meta.title,
        status: meta.status.toLowerCase(),
        icon: meta.icon,
        visible: meta.visible,
        sortOrder: i,
        content: doc.content[sectionId] ?? {},
      });

      console.log(`Seeded page section: ${pageSlug}/${sectionId}`);
    }
  }
}
