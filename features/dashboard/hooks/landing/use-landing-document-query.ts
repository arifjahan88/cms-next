'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getAdminLandingDocument } from '@/lib/api/landing';
import { landingKeys } from '@/lib/api/query-keys';

export function useLandingDocumentSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: landingKeys.document(),
    queryFn: getAdminLandingDocument,
  });
}
