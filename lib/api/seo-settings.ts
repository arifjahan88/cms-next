import { apiFetch } from '@/lib/api/client';
import type { PageSeoRow } from '@/db/schema';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import type { UpdatePageSeoValues } from '@/lib/validations/landing';

export type PageSeoDto = Pick<
  PageSeoRow,
  'pageSlug' | 'title' | 'description' | 'ogImage' | 'noIndex'
>;

export function getSeoSettings(): Promise<PageSeoDto[]> {
  return apiFetch<PageSeoDto[]>('/api/admin/seo-settings');
}

export function updatePageSeo(slug: PageSlug, payload: UpdatePageSeoValues) {
  return apiFetch<PageSeoDto>(`/api/admin/seo-settings/${slug}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
