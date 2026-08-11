import { and, asc, eq, sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { db } from '@/db';
import { landingSections, type LandingSectionRow } from '@/db/schema';
import {
  createLandingPageDocument,
  landingContentSeed,
  type LandingContent,
  type LandingPageDocument,
  type LandingSectionMeta,
  type SectionId,
} from '@/features/dashboard/data/landing-cms';

export const LANDING_CACHE_TAG = 'landing';

export function landingPageTag(pageSlug: string) {
  return `landing:${pageSlug}`;
}

export type PublicLandingSection = {
  sectionId: SectionId;
  content: LandingContent[SectionId];
  sortOrder: number;
};

function toUiStatus(status: string): LandingSectionMeta['status'] {
  return status.toLowerCase() === 'published' ? 'Published' : 'Draft';
}

function toDbStatus(status: LandingSectionMeta['status'] | string): 'published' | 'draft' {
  return status.toLowerCase() === 'published' ? 'published' : 'draft';
}

export function serializeLandingSectionMeta(row: LandingSectionRow): LandingSectionMeta {
  return {
    id: row.sectionId as SectionId,
    title: row.title,
    status: toUiStatus(row.status),
    icon: row.icon,
    visible: row.visible,
  };
}

export function serializeLandingDocument(rows: LandingSectionRow[]): LandingPageDocument {
  const ordered = [...rows].sort((a, b) => a.sortOrder - b.sortOrder);
  const sections = ordered.map(serializeLandingSectionMeta);
  const content: Record<string, unknown> = {};

  for (const row of ordered) {
    content[row.sectionId] = row.content;
  }

  return { sections, content: content as LandingContent };
}

export async function fetchLandingSections(pageSlug: string) {
  return db
    .select()
    .from(landingSections)
    .where(eq(landingSections.pageSlug, pageSlug))
    .orderBy(asc(landingSections.sortOrder));
}

export async function fetchLandingSection(pageSlug: string, sectionId: SectionId) {
  const [row] = await db
    .select()
    .from(landingSections)
    .where(
      and(eq(landingSections.pageSlug, pageSlug), eq(landingSections.sectionId, sectionId))
    )
    .limit(1);
  return row ?? null;
}

export async function getAdminLanding(pageSlug = 'home'): Promise<LandingPageDocument> {
  const rows = await fetchLandingSections(pageSlug);
  return serializeLandingDocument(rows);
}

export async function loadPublicLandingSections(pageSlug: string): Promise<PublicLandingSection[]> {
  const rows = await fetchLandingSections(pageSlug);

  if (!rows.length) {
    const doc = createLandingPageDocument();
    return doc.sections
      .filter((section) => section.visible)
      .map((section, index) => ({
        sectionId: section.id,
        content: doc.content[section.id],
        sortOrder: index,
      }));
  }

  const result: PublicLandingSection[] = [];

  for (const row of rows) {
    if (!row.visible) continue;

    const sectionId = row.sectionId as SectionId;
    const isPublished = row.status.toLowerCase() === 'published';
    const content = isPublished
      ? (row.content as LandingContent[typeof sectionId])
      : landingContentSeed[sectionId];

    result.push({
      sectionId,
      content,
      sortOrder: row.sortOrder,
    });
  }

  return result;
}

export function getPublicLandingSections(pageSlug = 'home') {
  return unstable_cache(() => loadPublicLandingSections(pageSlug), [`public-landing-${pageSlug}`], {
    tags: [LANDING_CACHE_TAG, landingPageTag(pageSlug)],
  })();
}

async function loadPublicLandingSection(
  pageSlug: string,
  sectionId: SectionId
): Promise<PublicLandingSection | null> {
  const row = await fetchLandingSection(pageSlug, sectionId);
  if (!row || !row.visible || row.status.toLowerCase() !== 'published') {
    return null;
  }

  return {
    sectionId,
    content: row.content as LandingContent[typeof sectionId],
    sortOrder: row.sortOrder,
  };
}

export function getPublicLandingSection(pageSlug: string, sectionId: SectionId) {
  return unstable_cache(
    () => loadPublicLandingSection(pageSlug, sectionId),
    [`public-landing-section-${pageSlug}-${sectionId}`],
    {
      tags: [LANDING_CACHE_TAG, landingPageTag(pageSlug)],
    }
  )();
}

export async function updateLandingSectionRow(
  pageSlug: string,
  sectionId: SectionId,
  patch: {
    title?: string;
    status?: LandingSectionMeta['status'] | string;
    icon?: string;
    visible?: boolean;
    content?: LandingContent[SectionId];
  }
) {
  const [updated] = await db
    .update(landingSections)
    .set({
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.status !== undefined ? { status: toDbStatus(patch.status) } : {}),
      ...(patch.icon !== undefined ? { icon: patch.icon } : {}),
      ...(patch.visible !== undefined ? { visible: patch.visible } : {}),
      ...(patch.content !== undefined ? { content: patch.content } : {}),
      updatedAt: new Date(),
    })
    .where(
      and(eq(landingSections.pageSlug, pageSlug), eq(landingSections.sectionId, sectionId))
    )
    .returning();

  return updated ?? null;
}

export async function reorderLandingSections(
  pageSlug: string,
  orderedSectionIds: SectionId[]
) {
  await db.transaction(async (tx) => {
    for (let i = 0; i < orderedSectionIds.length; i++) {
      const sectionId = orderedSectionIds[i]!;
      await tx
        .update(landingSections)
        .set({ sortOrder: i, updatedAt: new Date() })
        .where(
          and(eq(landingSections.pageSlug, pageSlug), eq(landingSections.sectionId, sectionId))
        );
    }
  });
}

export async function countLandingSections(pageSlug = 'home') {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(landingSections)
    .where(eq(landingSections.pageSlug, pageSlug));
  return row?.count ?? 0;
}

export { toDbStatus, toUiStatus };
