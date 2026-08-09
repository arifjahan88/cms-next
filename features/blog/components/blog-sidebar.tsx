'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { aboutCard, exploreTopics, popularPosts, subscribeCard } from '@/features/blog/data/blog';

export function BlogSidebar() {
  return (
    <aside className='space-y-6 lg:sticky lg:top-28 lg:self-start'>
      <Card className='overflow-hidden border shadow-sm'>
        <div className='relative aspect-16/10 bg-muted'>
          <ImagePlaceholder
            label={aboutCard.imageLabel}
            className='absolute inset-0 rounded-none border-0'
          />
        </div>
        <CardContent className='space-y-2 p-5'>
          <h3 className='text-base font-semibold'>{aboutCard.title}</h3>
          <p className='text-sm leading-relaxed text-muted-foreground'>{aboutCard.description}</p>
        </CardContent>
      </Card>

      <Card className='border shadow-sm'>
        <CardContent className='space-y-4 p-5'>
          <h3 className='text-base font-semibold'>Popular Posts</h3>
          <ol className='space-y-4'>
            {popularPosts.map((post, index) => (
              <li key={post.id} className='flex gap-3'>
                <span className='w-6 shrink-0 text-lg font-bold leading-none text-primary/35'>
                  {index + 1}
                </span>
                <Link href={post.href} className='group flex min-w-0 flex-1 gap-3'>
                  <div className='relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted'>
                    <ImagePlaceholder
                      label='[Thumb]'
                      className='absolute inset-0 min-h-0 rounded-lg border-0 text-[10px]'
                    />
                  </div>
                  <div className='min-w-0'>
                    <p className='line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary'>
                      {post.title}
                    </p>
                    <p className='mt-1 text-xs text-muted-foreground'>{post.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className='border shadow-sm'>
        <CardContent className='space-y-3 p-5'>
          <h3 className='text-base font-semibold'>{subscribeCard.title}</h3>
          <p className='text-sm text-muted-foreground'>{subscribeCard.description}</p>
          <form
            className='space-y-2'
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Thanks for subscribing!');
              (e.target as HTMLFormElement).reset();
            }}
          >
            <Input
              type='email'
              name='email'
              required
              placeholder={subscribeCard.placeholder}
              className='h-10'
            />
            <Button type='submit' className='w-full'>
              {subscribeCard.buttonLabel}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className='border shadow-sm'>
        <CardContent className='space-y-3 p-5'>
          <h3 className='text-base font-semibold'>Explore Topics</h3>
          <div className='flex flex-wrap gap-2'>
            {exploreTopics.map((topic) => (
              <Badge
                key={topic}
                variant='secondary'
                className='cursor-default rounded-full px-3 py-1 font-medium'
              >
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
