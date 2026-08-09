'use client';

import { useState } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import type { LandingContent, SectionId } from '@/features/dashboard/data/landing-cms';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

function PreviewBody({ sectionId, content }: { sectionId: SectionId; content: LandingContent }) {
  if (sectionId === 'hero') {
    const h = content.hero;
    return (
      <div className='space-y-3 p-4'>
        <p className='text-[10px] font-semibold uppercase tracking-wide text-primary'>{h.badge}</p>
        <h3 className='text-lg font-bold leading-snug'>
          {h.title} <span className='text-primary'>{h.highlight}</span>
        </h3>
        <p className='text-xs text-muted-foreground line-clamp-3'>{h.description}</p>
        <div className='flex flex-wrap gap-2'>
          <span className='rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground'>
            {h.primaryCta.label}
          </span>
          <span className='rounded-md border px-2.5 py-1 text-[10px] font-semibold'>
            {h.secondaryCta.label}
          </span>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {h.stats.slice(0, 4).map((s) => (
            <div key={s.label} className='rounded-md border p-2'>
              <p className='text-sm font-bold'>{s.value}</p>
              <p className='text-[10px] text-muted-foreground'>{s.label}</p>
            </div>
          ))}
        </div>
        <ImagePlaceholder label={h.media.label} className='aspect-video' />
      </div>
    );
  }

  if (sectionId === 'trustedBy') {
    const t = content.trustedBy;
    return (
      <div className='space-y-3 p-4'>
        <h3 className='text-sm font-bold'>{t.title}</h3>
        <div className='flex flex-wrap gap-2'>
          {t.brands.map((b) => (
            <span
              key={b.name}
              className='rounded-full border bg-muted/40 px-2.5 py-1 text-[10px] font-medium'
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (sectionId === 'services') {
    const s = content.services;
    return (
      <div className='space-y-3 p-4'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-sm font-bold'>{s.title}</h3>
          <span className='text-[10px] text-primary'>{s.action.label}</span>
        </div>
        <div className='grid gap-2'>
          {s.items.slice(0, 4).map((item) => (
            <div key={item.id} className='rounded-md border p-2'>
              <p className='text-xs font-semibold'>{item.title}</p>
              <p className='text-[10px] text-muted-foreground line-clamp-2'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sectionId === 'industries') {
    const s = content.industries;
    return (
      <div className='space-y-3 p-4'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-sm font-bold'>{s.title}</h3>
          <span className='text-[10px] text-primary'>{s.action.label}</span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {s.items.map((item) => (
            <span key={item.id} className='rounded-full border px-2.5 py-1 text-[10px] font-medium'>
              {item.title}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (sectionId === 'whyChoose') {
    const s = content.whyChoose;
    return (
      <div className='space-y-3 p-4'>
        <h3 className='text-sm font-bold'>{s.title}</h3>
        <span className='inline-block rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary'>
          {s.experienceBadge}
        </span>
        <div className='grid gap-2'>
          {s.items.slice(0, 3).map((item) => (
            <div key={item.title} className='rounded-md border p-2'>
              <p className='text-xs font-semibold'>{item.title}</p>
              <p className='text-[10px] text-muted-foreground line-clamp-2'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sectionId === 'caseStudies') {
    const s = content.caseStudies;
    return (
      <div className='space-y-3 p-4'>
        <h3 className='text-sm font-bold'>{s.title}</h3>
        {s.items.slice(0, 2).map((item) => (
          <div key={item.id} className='rounded-md border p-2'>
            <p className='text-[10px] text-primary'>{item.category}</p>
            <p className='text-xs font-semibold'>{item.title}</p>
            <p className='text-[10px] text-muted-foreground line-clamp-2'>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (sectionId === 'testimonials') {
    const s = content.testimonials;
    return (
      <div className='space-y-3 p-4'>
        <h3 className='text-sm font-bold'>{s.title}</h3>
        <p className='text-[10px] text-muted-foreground'>{s.description}</p>
        {s.items.slice(0, 2).map((item) => (
          <div key={item.id} className='rounded-md border p-2'>
            <p className='text-[10px] italic line-clamp-3'>&ldquo;{item.quote}&rdquo;</p>
            <p className='mt-1 text-[10px] font-semibold'>{item.name}</p>
            <p className='text-[10px] text-muted-foreground'>{item.role}</p>
          </div>
        ))}
      </div>
    );
  }

  const c = content.contactCta;
  return (
    <div className='space-y-3 p-4'>
      <div className='rounded-lg bg-primary p-3 text-primary-foreground'>
        <h3 className='text-sm font-bold'>{c.headline}</h3>
        <p className='mt-1 text-[10px] text-white/85 line-clamp-3'>{c.description}</p>
        <ul className='mt-2 space-y-1'>
          {c.benefits.slice(0, 3).map((b) => (
            <li key={b} className='text-[10px]'>
              • {b}
            </li>
          ))}
        </ul>
      </div>
      <div className='rounded-md border p-2'>
        <p className='text-xs font-semibold'>{c.formTitle}</p>
        <p className='mt-2 text-[10px] text-muted-foreground'>[{c.submitLabel}]</p>
      </div>
      <div className='rounded-md border p-2 text-[10px] text-muted-foreground'>
        <p className='font-semibold text-foreground'>{c.contactPanelTitle}</p>
        <p>{SITE.phone}</p>
        <p>{SITE.email}</p>
      </div>
    </div>
  );
}

export function LivePreview({
  sectionId,
  content,
}: {
  sectionId: SectionId;
  content: LandingContent;
}) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <Card className='border-border/80 shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
        <CardTitle className='text-base font-bold'>Live Preview</CardTitle>
        <div className='flex gap-1'>
          {(
            [
              ['desktop', Monitor],
              ['tablet', Tablet],
              ['mobile', Smartphone],
            ] as const
          ).map(([key, Icon]) => (
            <Button
              key={key}
              variant={device === key ? 'default' : 'ghost'}
              size='icon-sm'
              onClick={() => setDevice(key)}
              aria-label={key}
            >
              <Icon className='size-3.5' />
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'mx-auto overflow-hidden rounded-xl border bg-background',
            device === 'desktop' && 'w-full',
            device === 'tablet' && 'w-[85%]',
            device === 'mobile' && 'w-[55%]'
          )}
        >
          <div className='max-h-[28rem] overflow-y-auto'>
            <PreviewBody sectionId={sectionId} content={content} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
