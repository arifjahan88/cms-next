import { getPublicLandingSections } from '@/db/queries/landing';
import type { LandingContent, SectionId } from '@/features/dashboard/data/landing-cms';
import { landingContentSeed } from '@/features/dashboard/data/landing-cms';

export type ResolvedLandingSection = {
  sectionId: SectionId;
  content: LandingContent[SectionId];
  sortOrder: number;
};

export function getSectionFallback(sectionId: SectionId): LandingContent[SectionId] {
  return landingContentSeed[sectionId];
}

/** @deprecated Prefer loadPublicLandingSections inside a `'use cache'` scope. */
export async function getPublicLandingPageSections(): Promise<ResolvedLandingSection[]> {
  try {
    const sections = await getPublicLandingSections('home');
    return sections.map((section) => ({
      sectionId: section.sectionId as SectionId,
      content: section.content as LandingContent[SectionId],
      sortOrder: section.sortOrder,
    }));
  } catch {
    const fallback = Object.keys(landingContentSeed) as SectionId[];
    return fallback.map((sectionId, index) => ({
      sectionId,
      content: landingContentSeed[sectionId],
      sortOrder: index,
    }));
  }
}
