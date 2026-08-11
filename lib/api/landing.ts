import { apiFetch } from '@/lib/api/client';
import type { LandingPageDocument, SectionId } from '@/features/dashboard/data/landing-cms';
import type { PageDocument } from '@/features/dashboard/data/page-seeds';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import type { UpdateLandingSectionValues } from '@/lib/validations/landing';

export function getAdminLandingDocument(page: PageSlug = 'home'): Promise<LandingPageDocument> {
  return apiFetch<LandingPageDocument>(`/api/admin/landing?page=${page}`);
}

export function getAdminPageDocument(page: PageSlug): Promise<PageDocument> {
  return apiFetch<PageDocument>(`/api/admin/landing?page=${page}`);
}

export function updateLandingSection(
  sectionId: SectionId | string,
  payload: UpdateLandingSectionValues,
  page: PageSlug = 'home'
): Promise<LandingPageDocument | PageDocument> {
  return apiFetch(`/api/admin/landing/sections/${sectionId}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...payload, page }),
  });
}

export function reorderLandingSections(
  orderedSectionIds: string[],
  page: PageSlug = 'home'
): Promise<LandingPageDocument | PageDocument> {
  return apiFetch(`/api/admin/landing/sections/reorder`, {
    method: 'PUT',
    body: JSON.stringify({ orderedSectionIds, page }),
  });
}
