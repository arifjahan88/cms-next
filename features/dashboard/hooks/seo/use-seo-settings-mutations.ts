'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePageSeo } from '@/lib/api/seo-settings';
import { seoKeys } from '@/lib/api/query-keys';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import type { UpdatePageSeoValues } from '@/lib/validations/landing';

function useInvalidateSeo() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: seoKeys.all });
}

export function useUpdatePageSeoMutation() {
  const invalidate = useInvalidateSeo();

  return useMutation({
    mutationFn: ({ slug, payload }: { slug: PageSlug; payload: UpdatePageSeoValues }) =>
      updatePageSeo(slug, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}
