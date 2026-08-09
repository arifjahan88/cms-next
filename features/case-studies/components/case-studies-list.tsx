'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Container } from '@/components/shared/container';
import { FilterPills } from '@/components/shared/filter-pills';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { TechStackItem } from '@/components/shared/tech-icon';
import { FadeIn } from '@/components/shared/motion/fade-in';
import {
  caseStudies,
  caseStudyFilters,
  caseStudySortOptions,
} from '@/features/case-studies/data/case-studies';
import { cn } from '@/lib/utils';

type SortValue = (typeof caseStudySortOptions)[number]['value'];

const badgeColors: Record<string, string> = {
  Healthcare: 'bg-orange-500 text-white',
  FinTech: 'bg-emerald-500 text-white',
  'Real Estate': 'bg-blue-600 text-white',
  'E-commerce': 'bg-violet-500 text-white',
};

export function CaseStudiesList() {
  const [category, setCategory] = useState<string>('All Case Studies');
  const [sort, setSort] = useState<SortValue>('latest');

  const items = useMemo(() => {
    const filtered =
      category === 'All Case Studies'
        ? caseStudies
        : caseStudies.filter((item) => item.category === category);

    return [...filtered].sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [category, sort]);

  return (
    <section className='py-12 md:py-16'>
      <Container>
        <div className='mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <FilterPills items={[...caseStudyFilters]} value={category} onChange={setCategory} />
          <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>Sort by:</span>
            <Select
              value={sort}
              onValueChange={(value) => {
                if (value) setSort(value as SortValue);
              }}
            >
              <SelectTrigger className='min-w-36'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {caseStudySortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='space-y-6'>
          {items.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05}>
              <article className='overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md'>
                <div className='grid gap-0 lg:grid-cols-[1.1fr_1.2fr_0.85fr]'>
                  <div className='relative min-h-52 bg-muted lg:min-h-full'>
                    <ImagePlaceholder
                      label='[Desktop + Mobile Preview]'
                      className='absolute inset-0 rounded-none border-0'
                    />
                    <span
                      className={cn(
                        'absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm',
                        badgeColors[item.category] ?? 'bg-primary text-white'
                      )}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className='flex flex-col gap-3 p-5 md:p-6'>
                    <h2 className='text-xl font-bold tracking-tight text-foreground'>
                      {item.title}
                    </h2>
                    <p className='text-sm text-muted-foreground'>{item.description}</p>
                    <div>
                      <p className='text-sm font-semibold text-foreground'>The Challenge</p>
                      <p className='mt-1 text-sm text-muted-foreground'>{item.challenge}</p>
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-foreground'>Our Solution</p>
                      <p className='mt-1 text-sm text-muted-foreground'>{item.solution}</p>
                    </div>
                    <Link
                      href={item.href}
                      className='mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline'
                    >
                      View Full Case Study
                      <ArrowRight className='size-3.5' />
                    </Link>
                  </div>

                  <div className='flex flex-col gap-5 border-t bg-surface/60 p-5 lg:border-l lg:border-t-0 md:p-6'>
                    <div>
                      <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                        Key Metrics
                      </p>
                      <div className='space-y-3'>
                        {item.metrics?.map((metric) => (
                          <div key={metric.label} className='flex items-start gap-2.5'>
                            <span className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                              <TrendingUp className='size-3.5' />
                            </span>
                            <div>
                              <p className='text-lg font-bold text-foreground'>{metric.value}</p>
                              <p className='text-xs text-muted-foreground'>{metric.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                        Tech Stack
                      </p>
                      <div className='flex flex-wrap gap-x-3 gap-y-2'>
                        {item.techStack.map((tech) => (
                          <TechStackItem key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
