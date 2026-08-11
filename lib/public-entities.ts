import { cacheTag } from 'next/cache';
import {
  BLOG_CACHE_TAG,
  listFeaturedBlogPosts,
  listPublishedBlogPosts,
} from '@/db/queries/blog';
import {
  CASE_STUDIES_CACHE_TAG,
  listFeaturedCaseStudies,
  listPublishedCaseStudies,
} from '@/db/queries/case-studies';
import { JOBS_CACHE_TAG, listPublishedJobOpenings } from '@/db/queries/jobs';
import { PORTFOLIO_CACHE_TAG, listPublishedPortfolioProjects } from '@/db/queries/portfolio';
import { blogPosts as staticPosts } from '@/features/blog/data/blog';
import { caseStudies as staticCaseStudies } from '@/features/case-studies/data/case-studies';
import { jobs as staticJobs } from '@/features/careers/data/careers';
import { portfolioProjects as staticPortfolio } from '@/features/portfolio/data/portfolio';
import { safeDbQuery } from '@/lib/db-safe';
import type { BlogPost } from '@/types';
import type { CaseStudyItem } from '@/types';
import type { JobOpening } from '@/types';
import type { PortfolioItem } from '@/types';

function formatDate(date: Date | null, fallback: string) {
  if (!date) return fallback;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function loadPublicBlogPosts(): Promise<BlogPost[]> {
  'use cache';
  cacheTag(BLOG_CACHE_TAG);

  const rows = await safeDbQuery(() => listPublishedBlogPosts(), []);
  if (!rows.length) return staticPosts;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: formatDate(row.publishedAt, '—'),
    readTime: row.readTime,
    image: row.image,
    href: `/blog/${row.slug}`,
    author: row.author,
    featured: row.featured,
  }));
}

export async function loadPublicCaseStudies(): Promise<
  (CaseStudyItem & { date?: string; slug?: string })[]
> {
  'use cache';
  cacheTag(CASE_STUDIES_CACHE_TAG);

  const rows = await safeDbQuery(() => listPublishedCaseStudies(), []);
  if (!rows.length) return staticCaseStudies;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
    href: `/case-studies/${row.slug}`,
    techStack: row.techStack,
    challenge: row.challenge,
    solution: row.solution,
    metrics: row.metrics,
    date: row.publishedAt?.toISOString().slice(0, 10),
    slug: row.slug,
  }));
}

export async function loadFeaturedCaseStudyItems() {
  'use cache';
  cacheTag(CASE_STUDIES_CACHE_TAG);

  const staticFeatured = staticCaseStudies.slice(0, 3).map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    category: c.category,
    image: c.image,
    href: `/case-studies`,
    techStack: c.techStack,
  }));

  const rows = await safeDbQuery(() => listFeaturedCaseStudies(), []);
  if (!rows.length) return staticFeatured;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
    href: `/case-studies/${row.slug}`,
    techStack: row.techStack,
  }));
}

export async function loadPublicJobs(): Promise<JobOpening[]> {
  'use cache';
  cacheTag(JOBS_CACHE_TAG);

  const rows = await safeDbQuery(() => listPublishedJobOpenings(), []);
  if (!rows.length) return staticJobs;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    department: row.department,
    type: row.type,
    location: row.location,
    description: row.description,
    href: row.applyHref,
  }));
}

export async function loadPublicPortfolio(): Promise<PortfolioItem[]> {
  'use cache';
  cacheTag(PORTFOLIO_CACHE_TAG);

  const rows = await safeDbQuery(() => listPublishedPortfolioProjects(), []);
  if (!rows.length) return staticPortfolio;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
    href: row.href,
    date: row.projectDate,
  }));
}

export async function loadFeaturedBlogPost() {
  'use cache';
  cacheTag(BLOG_CACHE_TAG);

  const staticFeatured = staticPosts.find((p) => p.featured) ?? staticPosts[0];
  const rows = await safeDbQuery(() => listFeaturedBlogPosts(), []);
  if (!rows[0]) return staticFeatured;

  const row = rows[0];
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: formatDate(row.publishedAt, '—'),
    readTime: row.readTime,
    image: row.image,
    href: `/blog/${row.slug}`,
    author: row.author,
    featured: row.featured,
  };
}
