'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import {
  portfolioFilters,
  portfolioSortOptions,
} from '@/features/portfolio/data/portfolio';
import type { PortfolioItem } from '@/types';
import { cn } from '@/lib/utils';

type SortValue = (typeof portfolioSortOptions)[number]['value'];

const badgeColors: Record<string, string> = {
  Healthcare: 'bg-sky-500 text-white',
  FinTech: 'bg-emerald-500 text-white',
  'Real Estate': 'bg-blue-600 text-white',
  'E-commerce': 'bg-orange-500 text-white',
  Education: 'bg-violet-500 text-white',
  Logistics: 'bg-teal-500 text-white',
  Manufacturing: 'bg-indigo-500 text-white',
};

export function PortfolioGrid({ projects: initialProjects }: { projects: PortfolioItem[] }) {
  const [category, setCategory] = useState<string>('All Projects');
  const [sort, setSort] = useState<SortValue>('latest');

  const projects = useMemo(() => {
    const filtered =
      category === 'All Projects'
        ? initialProjects
        : initialProjects.filter((item) => item.category === category);

    return [...filtered].sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [category, sort, initialProjects]);

  return (
    <section className='py-12 md:py-16'>
      <Container>
        <div className='mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <FilterPills items={[...portfolioFilters]} value={category} onChange={setCategory} />
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
                {portfolioSortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <StaggerChildren className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((item) => (
            <StaggerItem key={item.id} hoverLift={false}>
              <Card className='h-full overflow-hidden rounded-xl border border-border/80 bg-background p-0 shadow-sm transition-shadow hover:shadow-md'>
                <div className='relative aspect-16/10 overflow-hidden rounded-t-xl bg-muted'>
                  <ImagePlaceholder
                    label='[Project Preview Image]'
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
                <CardContent className='flex h-full flex-col gap-2.5 p-5'>
                  <h3 className='text-base font-bold leading-snug text-foreground'>{item.title}</h3>
                  <p className='text-sm text-muted-foreground'>{item.description}</p>
                  <Link
                    href={item.href}
                    className='mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-primary hover:underline'
                  >
                    View Case Study
                    <ArrowRight className='size-3.5' />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
