import type { PageSlug } from '@/features/dashboard/data/public-pages';
import {
  createPageDocument,
  type PageDocument,
  type PageSectionMeta,
} from '@/features/dashboard/data/page-seeds';

export type { PageDocument, PageSectionMeta };
export type SectionStatus = 'Published' | 'Draft';

export function getPageSectionIds(pageSlug: PageSlug): string[] {
  return createPageDocument(pageSlug).sections.map((s) => s.id);
}

export function isValidPageSection(pageSlug: PageSlug, sectionId: string): boolean {
  return getPageSectionIds(pageSlug).includes(sectionId);
}

export function getPageSeedDocument(pageSlug: PageSlug): PageDocument {
  return createPageDocument(pageSlug);
}

export function getPageSeedContent(
  pageSlug: PageSlug,
  sectionId: string
): unknown {
  const doc = createPageDocument(pageSlug);
  return doc.content[sectionId];
}
