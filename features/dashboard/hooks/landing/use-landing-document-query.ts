'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getAdminLandingDocument, getAdminPageDocument } from '@/lib/api/landing';
import { landingKeys } from '@/lib/api/query-keys';
import type { PageSlug } from '@/features/dashboard/data/public-pages';

export function useLandingDocumentSuspenseQuery(page: PageSlug = 'home') {
  return useSuspenseQuery({
    queryKey: landingKeys.document(page),
    queryFn: () =>
      page === 'home' ? getAdminLandingDocument(page) : getAdminPageDocument(page),
  });
}
