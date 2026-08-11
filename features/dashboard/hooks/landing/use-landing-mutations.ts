'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reorderLandingSections, updateLandingSection } from '@/lib/api/landing';
import { landingKeys } from '@/lib/api/query-keys';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import type { UpdateLandingSectionValues } from '@/lib/validations/landing';

function useInvalidateLanding(page: PageSlug) {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: landingKeys.document(page) });
}

export function useUpdateLandingSectionMutation(page: PageSlug = 'home') {
  const invalidate = useInvalidateLanding(page);

  return useMutation({
    mutationFn: ({
      sectionId,
      payload,
    }: {
      sectionId: string;
      payload: UpdateLandingSectionValues;
    }) => updateLandingSection(sectionId, payload, page),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useReorderLandingSectionsMutation(page: PageSlug = 'home') {
  const invalidate = useInvalidateLanding(page);

  return useMutation({
    mutationFn: (orderedSectionIds: string[]) =>
      reorderLandingSections(orderedSectionIds, page),
    onSuccess: async () => {
      await invalidate();
    },
  });
}
