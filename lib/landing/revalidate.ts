import { revalidatePath, revalidateTag } from 'next/cache';
import { LANDING_CACHE_TAG, landingPageTag } from '@/db/queries/landing';

export function revalidateLanding(pageSlug = 'home') {
  revalidateTag(LANDING_CACHE_TAG, 'max');
  revalidateTag(landingPageTag(pageSlug), 'max');
  revalidatePath('/', 'layout');
}
