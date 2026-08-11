import type { Metadata } from 'next';
import { cacheTag } from 'next/cache';
import { getPublicPageSeo, SEO_CACHE_TAG, seoPageTag } from '@/db/queries/page-seo';
import { getPublicPage, type PageSlug } from '@/features/dashboard/data/public-pages';

export async function buildPageMetadata(pageSlug: PageSlug): Promise<Metadata> {
  'use cache';
  cacheTag(SEO_CACHE_TAG, seoPageTag(pageSlug));

  const seo = await getPublicPageSeo(pageSlug);
  const defaults = getPublicPage(pageSlug)!;

  const title = seo?.title ?? defaults.defaultTitle;
  const description = seo?.description ?? defaults.defaultDescription;
  const ogImage = seo && 'ogImage' in seo ? seo.ogImage : null;
  const noIndex = seo && 'noIndex' in seo ? seo.noIndex : false;

  return {
    title,
    description,
    ...(ogImage ? { openGraph: { images: [ogImage] } } : {}),
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
