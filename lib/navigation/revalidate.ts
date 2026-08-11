import { revalidatePath, revalidateTag } from 'next/cache';
import { NAVIGATION_CACHE_TAG, navigationSlugTag } from '@/db/queries/navigation';

export function revalidateNavigation(slug?: string) {
  revalidateTag(NAVIGATION_CACHE_TAG, 'max');
  if (slug) {
    revalidateTag(navigationSlugTag(slug), 'max');
  }
  revalidatePath('/', 'layout');
}
