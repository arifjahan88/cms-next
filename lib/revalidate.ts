import { revalidatePath, revalidateTag } from 'next/cache';
import { BLOG_CACHE_TAG, blogSlugTag } from '@/db/queries/blog';
import { CASE_STUDIES_CACHE_TAG, caseStudySlugTag } from '@/db/queries/case-studies';
import { JOBS_CACHE_TAG } from '@/db/queries/jobs';
import { LANDING_CACHE_TAG, landingPageTag } from '@/db/queries/landing';
import { PORTFOLIO_CACHE_TAG } from '@/db/queries/portfolio';
import { SEO_CACHE_TAG, seoPageTag } from '@/db/queries/page-seo';

export function revalidateLanding(pageSlug = 'home') {
  revalidateTag(LANDING_CACHE_TAG, 'max');
  revalidateTag(landingPageTag(pageSlug), 'max');
  revalidatePath('/', 'layout');
}

export function revalidateSeo(pageSlug: string) {
  revalidateTag(SEO_CACHE_TAG, 'max');
  revalidateTag(seoPageTag(pageSlug), 'max');
}

export function revalidateBlog(slug?: string) {
  revalidateTag(BLOG_CACHE_TAG, 'max');
  if (slug) revalidateTag(blogSlugTag(slug), 'max');
  revalidatePath('/blog', 'layout');
}

export function revalidateCaseStudies(slug?: string) {
  revalidateTag(CASE_STUDIES_CACHE_TAG, 'max');
  if (slug) revalidateTag(caseStudySlugTag(slug), 'max');
  revalidatePath('/case-studies', 'layout');
}

export function revalidateJobs() {
  revalidateTag(JOBS_CACHE_TAG, 'max');
  revalidatePath('/careers', 'layout');
}

export function revalidatePortfolio() {
  revalidateTag(PORTFOLIO_CACHE_TAG, 'max');
  revalidatePath('/portfolio', 'layout');
}
