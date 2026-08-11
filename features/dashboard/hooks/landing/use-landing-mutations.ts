'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reorderLandingSections, updateLandingSection } from '@/lib/api/landing';
import { landingKeys } from '@/lib/api/query-keys';
import type { SectionId } from '@/features/dashboard/data/landing-cms';
import type {
  ReorderLandingSectionsValues,
  UpdateLandingSectionValues,
} from '@/lib/validations/landing';

function useInvalidateLanding() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: landingKeys.admin });
}

export function useUpdateLandingSectionMutation() {
  const invalidate = useInvalidateLanding();

  return useMutation({
    mutationFn: ({
      sectionId,
      payload,
    }: {
      sectionId: SectionId;
      payload: UpdateLandingSectionValues;
    }) => updateLandingSection(sectionId, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useReorderLandingSectionsMutation() {
  const invalidate = useInvalidateLanding();

  return useMutation({
    mutationFn: (payload: ReorderLandingSectionsValues) => reorderLandingSections(payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}
