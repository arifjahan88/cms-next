import { apiFetch } from '@/lib/api/client';
import type { LandingPageDocument, SectionId } from '@/features/dashboard/data/landing-cms';
import type {
  ReorderLandingSectionsValues,
  UpdateLandingSectionValues,
} from '@/lib/validations/landing';

export function getAdminLandingDocument(): Promise<LandingPageDocument> {
  return apiFetch<LandingPageDocument>('/api/admin/landing');
}

export function updateLandingSection(
  sectionId: SectionId,
  payload: UpdateLandingSectionValues
): Promise<LandingPageDocument> {
  return apiFetch<LandingPageDocument>(`/api/admin/landing/sections/${sectionId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function reorderLandingSections(
  payload: ReorderLandingSectionsValues
): Promise<LandingPageDocument> {
  return apiFetch<LandingPageDocument>('/api/admin/landing/sections/reorder', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
