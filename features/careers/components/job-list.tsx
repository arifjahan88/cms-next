'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, RotateCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import type { JobOpening } from '@/types';
import {
  jobDepartments,
  jobLocations,
  openPositionsIntro,
} from '@/features/careers/data/careers';

const DEFAULT_DEPT = 'All Departments';
const DEFAULT_LOC = 'All Locations';

export function JobList({ jobs }: { jobs: JobOpening[] }) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState<string>(DEFAULT_DEPT);
  const [location, setLocation] = useState<string>(DEFAULT_LOC);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q);
      const matchesDept = department === DEFAULT_DEPT || job.department === department;
      const matchesLoc = location === DEFAULT_LOC || job.location === location;
      return matchesQuery && matchesDept && matchesLoc;
    });
  }, [query, department, location]);

  const visible = showAll ? filtered : filtered.slice(0, 5);

  function resetFilters() {
    setQuery('');
    setDepartment(DEFAULT_DEPT);
    setLocation(DEFAULT_LOC);
    setShowAll(false);
  }

  return (
    <section id='open-positions' className='scroll-mt-28 py-16 md:py-20'>
      <Container>
        <SectionHeader
          eyebrow={openPositionsIntro.eyebrow}
          title={openPositionsIntro.title}
          description={openPositionsIntro.description}
        />

        <div className='mb-8 grid gap-3 md:grid-cols-[1fr_200px_200px_auto]'>
          <div className='relative'>
            <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search roles...'
              className='h-10 pl-9'
              aria-label='Search open positions'
            />
          </div>
          <Select value={department} onValueChange={(v) => setDepartment(v ?? DEFAULT_DEPT)}>
            <SelectTrigger className='h-10 w-full'>
              <SelectValue placeholder='Department' />
            </SelectTrigger>
            <SelectContent>
              {jobDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={(v) => setLocation(v ?? DEFAULT_LOC)}>
            <SelectTrigger className='h-10 w-full'>
              <SelectValue placeholder='Location' />
            </SelectTrigger>
            <SelectContent>
              {jobLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type='button' variant='outline' className='h-10 px-4' onClick={resetFilters}>
            <RotateCcw data-icon='inline-start' />
            Reset
          </Button>
        </div>

        <div className='space-y-3'>
          {visible.length === 0 ? (
            <div className='rounded-xl border border-dashed bg-muted/30 px-6 py-12 text-center'>
              <p className='font-medium'>No roles match your filters</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                Try another keyword or send us your CV below.
              </p>
            </div>
          ) : (
            visible.map((job) => (
              <article
                key={job.id}
                className='rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md'
              >
                <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='min-w-0 flex-1'>
                    <h3 className='text-lg font-semibold text-foreground'>{job.title}</h3>
                    <div className='mt-2 flex flex-wrap items-center gap-2'>
                      <Badge variant='secondary'>{job.department}</Badge>
                      <Badge variant='outline' className='border-primary/30 text-primary'>
                        {job.type}
                      </Badge>
                      <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                        <MapPin className='size-3.5' />
                        {job.location}
                      </span>
                    </div>
                    <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                      {job.description}
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    className='shrink-0 border-primary text-primary hover:bg-primary/5'
                    render={<Link href={job.href} />}
                  >
                    View Details
                    <ArrowRight data-icon='inline-end' />
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>

        {filtered.length > 5 ? (
          <div className='mt-8 flex justify-center'>
            <Button
              type='button'
              variant='outline'
              className='h-10 px-5 border-primary text-primary hover:bg-primary/5'
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? 'Show Less' : 'View All Open Positions'}
              {!showAll ? <ArrowRight data-icon='inline-end' /> : null}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
