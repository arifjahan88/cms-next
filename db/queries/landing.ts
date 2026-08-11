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
import {
  getPageSeedContent,
  getPageSeedDocument,
} from '@/features/dashboard/data/page-configs';
import type { PageDocument, PageSectionMeta } from '@/features/dashboard/data/page-seeds';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import { safeDbQuery } from '@/lib/db-safe';

export const LANDING_CACHE_TAG = 'landing';

export function landingPageTag(pageSlug: string) {
  return `landing:${pageSlug}`;
}

export type PublicLandingSection = {
  sectionId: string;
  content: unknown;
  sortOrder: number;
};

function toUiStatus(status: string): 'Published' | 'Draft' {
  return status.toLowerCase() === 'published' ? 'Published' : 'Draft';
}

function toDbStatus(status: 'Published' | 'Draft' | string): 'published' | 'draft' {
  return status.toLowerCase() === 'published' ? 'published' : 'draft';
}

export function serializePageSectionMeta(row: LandingSectionRow): PageSectionMeta {
  return {
    id: row.sectionId,
    title: row.title,
    status: toUiStatus(row.status),
    icon: row.icon,
    visible: row.visible,
  };
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

export function serializePageDocument(rows: LandingSectionRow[]): PageDocument {
  const ordered = [...rows].sort((a, b) => a.sortOrder - b.sortOrder);
  const sections = ordered.map(serializePageSectionMeta);
  const content: Record<string, unknown> = {};

  for (const row of ordered) {
    content[row.sectionId] = row.content;
  }

  return { sections, content };
}

export function serializeLandingDocument(rows: LandingSectionRow[]): LandingPageDocument {
  const doc = serializePageDocument(rows);
  return {
    sections: doc.sections as LandingSectionMeta[],
    content: doc.content as LandingContent,
  };
}

export async function fetchLandingSections(pageSlug: string) {
  return db
    .select()
    .from(landingSections)
    .where(eq(landingSections.pageSlug, pageSlug))
    .orderBy(asc(landingSections.sortOrder));
}

export async function fetchLandingSection(pageSlug: string, sectionId: string) {
  const [row] = await db
    .select()
    .from(landingSections)
    .where(
      and(eq(landingSections.pageSlug, pageSlug), eq(landingSections.sectionId, sectionId))
    )
    .limit(1);
  return row ?? null;
}

export async function getAdminPage(pageSlug: PageSlug): Promise<PageDocument> {
  const rows = await safeDbQuery(() => fetchLandingSections(pageSlug), []);
  if (!rows.length) return getPageSeedDocument(pageSlug);
  return serializePageDocument(rows);
}

export async function getAdminLanding(pageSlug = 'home'): Promise<LandingPageDocument> {
  const rows = await safeDbQuery(() => fetchLandingSections(pageSlug), []);
  if (!rows.length) return createLandingPageDocument();
  return serializeLandingDocument(rows);
}

function getSeedPublicLandingSections(pageSlug: PageSlug): PublicLandingSection[] {
  const seedDoc = getPageSeedDocument(pageSlug);
  return seedDoc.sections
    .filter((section) => section.visible)
    .map((section, index) => ({
      sectionId: section.id,
      content: seedDoc.content[section.id],
      sortOrder: index,
    }));
}

export async function loadPublicLandingSections(
  pageSlug: PageSlug
): Promise<PublicLandingSection[]> {
  const rows = await safeDbQuery(() => fetchLandingSections(pageSlug), []);
  const seedDoc = getPageSeedDocument(pageSlug);

  if (!rows.length) {
    return getSeedPublicLandingSections(pageSlug);
  }

  const result: PublicLandingSection[] = [];

  for (const row of rows) {
    if (!row.visible) continue;

    const isPublished = row.status.toLowerCase() === 'published';
    const content = isPublished
      ? row.content
      : (getPageSeedContent(pageSlug, row.sectionId) ?? seedDoc.content[row.sectionId]);

    result.push({
      sectionId: row.sectionId,
      content,
      sortOrder: row.sortOrder,
    });
  }

  return result;
}

export function getPublicLandingSections(pageSlug: PageSlug = 'home') {
  return unstable_cache(() => loadPublicLandingSections(pageSlug), [`public-landing-${pageSlug}`], {
    tags: [LANDING_CACHE_TAG, landingPageTag(pageSlug)],
  })();
}

async function loadPublicLandingSection(
  pageSlug: PageSlug,
  sectionId: string
): Promise<PublicLandingSection | null> {
  const row = await safeDbQuery(
    () => fetchLandingSection(pageSlug, sectionId),
    null
  );
  if (!row || !row.visible || row.status.toLowerCase() !== 'published') {
    return null;
  }

  return {
    sectionId: row.sectionId,
    content: row.content,
    sortOrder: row.sortOrder,
  };
}

export function getPublicLandingSection(pageSlug: PageSlug, sectionId: string) {
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
  sectionId: string,
  patch: {
    title?: string;
    status?: 'Published' | 'Draft' | string;
    icon?: string;
    visible?: boolean;
    content?: unknown;
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

export async function reorderLandingSections(pageSlug: string, orderedSectionIds: string[]) {
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
