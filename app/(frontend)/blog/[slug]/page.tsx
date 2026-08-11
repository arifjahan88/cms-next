import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cacheTag } from 'next/cache';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { BLOG_CACHE_TAG, blogSlugTag, getPublishedBlogPostBySlug } from '@/db/queries/blog';
import { safeDbQuery } from '@/lib/db-safe';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  'use cache';
  const { slug } = await params;
  cacheTag(BLOG_CACHE_TAG, blogSlugTag(slug));
  const post = await safeDbQuery(() => getPublishedBlogPostBySlug(slug), null);
  if (!post) return { title: 'Blog Post' };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Params) {
  'use cache';
  const { slug } = await params;
  cacheTag(BLOG_CACHE_TAG, blogSlugTag(slug));

  const post = await safeDbQuery(() => getPublishedBlogPostBySlug(slug), null);
  if (!post) notFound();

  return (
    <Container className='py-16 md:py-20'>
      <Link
        href='/blog'
        className='mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='size-4' />
        Back to blog
      </Link>
      <div className='mx-auto max-w-3xl'>
        <p className='text-sm font-medium text-primary'>{post.category}</p>
        <h1 className='mt-2 text-3xl font-bold tracking-tight md:text-4xl'>{post.title}</h1>
        <p className='mt-3 text-sm text-muted-foreground'>
          {post.author} · {post.readTime}
        </p>
        <div className='mt-8 overflow-hidden rounded-2xl border'>
          <ImagePlaceholder label={post.image || '[Blog image]'} className='min-h-60 w-full' />
        </div>
        <div className='prose prose-neutral mt-8 max-w-none dark:prose-invert'>
          {post.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className='mb-4 leading-relaxed text-muted-foreground'>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
}
