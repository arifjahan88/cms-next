import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cacheTag } from 'next/cache';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { TechStackItem } from '@/components/shared/tech-icon';
import {
  CASE_STUDIES_CACHE_TAG,
  caseStudySlugTag,
  getPublishedCaseStudyBySlug,
} from '@/db/queries/case-studies';
import { safeDbQuery } from '@/lib/db-safe';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  'use cache';
  const { slug } = await params;
  cacheTag(CASE_STUDIES_CACHE_TAG, caseStudySlugTag(slug));
  const item = await safeDbQuery(() => getPublishedCaseStudyBySlug(slug), null);
  if (!item) return { title: 'Case Study' };
  return {
    title: item.seoTitle ?? item.title,
    description: item.seoDescription ?? item.description,
  };
}

export default async function CaseStudyDetailPage({ params }: Params) {
  'use cache';
  const { slug } = await params;
  cacheTag(CASE_STUDIES_CACHE_TAG, caseStudySlugTag(slug));

  const item = await safeDbQuery(() => getPublishedCaseStudyBySlug(slug), null);
  if (!item) notFound();

  return (
    <Container className='py-16 md:py-20'>
      <Link
        href='/case-studies'
        className='mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='size-4' />
        Back to case studies
      </Link>
      <div className='mx-auto max-w-4xl'>
        <p className='text-sm font-medium text-primary'>{item.category}</p>
        <h1 className='mt-2 text-3xl font-bold tracking-tight md:text-4xl'>{item.title}</h1>
        <p className='mt-4 text-lg text-muted-foreground'>{item.description}</p>
        <div className='mt-8 overflow-hidden rounded-2xl border'>
          <ImagePlaceholder label={item.image || '[Case study image]'} className='min-h-60 w-full' />
        </div>
        <div className='mt-10 grid gap-8 md:grid-cols-2'>
          <div>
            <h2 className='text-lg font-semibold'>Challenge</h2>
            <p className='mt-2 text-muted-foreground'>{item.challenge}</p>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Solution</h2>
            <p className='mt-2 text-muted-foreground'>{item.solution}</p>
          </div>
        </div>
        {item.techStack.length > 0 ? (
          <div className='mt-10'>
            <h2 className='text-lg font-semibold'>Tech stack</h2>
            <div className='mt-3 flex flex-wrap gap-2'>
              {item.techStack.map((tech) => (
                <TechStackItem key={tech} name={tech} />
              ))}
            </div>
          </div>
        ) : null}
        {item.metrics.length > 0 ? (
          <div className='mt-10 grid gap-4 sm:grid-cols-3'>
            {item.metrics.map((metric) => (
              <div key={metric.label} className='rounded-xl border p-4 text-center'>
                <p className='text-2xl font-bold text-primary'>{metric.value}</p>
                <p className='mt-1 text-sm text-muted-foreground'>{metric.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
