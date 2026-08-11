import { and, count, eq } from 'drizzle-orm';
import {
  createLandingPageDocument,
  type SectionId,
} from '@/features/dashboard/data/landing-cms';
import { db } from './index';
import { landingSections } from './schema';

const HOME_SLUG = 'home';

export async function countLandingSections(pageSlug = HOME_SLUG) {
  const [row] = await db
    .select({ count: count() })
    .from(landingSections)
    .where(eq(landingSections.pageSlug, pageSlug));
  return row?.count ?? 0;
}

export async function seedLanding() {
  const doc = createLandingPageDocument();

  for (let i = 0; i < doc.sections.length; i++) {
    const meta = doc.sections[i]!;
    const sectionId = meta.id as SectionId;

    const [existing] = await db
      .select({ id: landingSections.id })
      .from(landingSections)
      .where(
        and(
          eq(landingSections.pageSlug, HOME_SLUG),
          eq(landingSections.sectionId, sectionId)
        )
      )
      .limit(1);

    if (existing) {
      console.log(`Landing section already exists: ${sectionId}`);
      continue;
    }

    await db.insert(landingSections).values({
      pageSlug: HOME_SLUG,
      sectionId,
      title: meta.title,
      status: meta.status.toLowerCase(),
      icon: meta.icon,
      visible: meta.visible,
      sortOrder: i,
      content: doc.content[sectionId],
    });

    console.log(`Seeded landing section: ${sectionId}`);
  }
}
