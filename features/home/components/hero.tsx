'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { StatItem } from '@/components/shared/stat-item';
import { homeHero } from '@/features/home/data/home';
import { landingContentSeed, type LandingContent } from '@/features/dashboard/data/landing-cms';
import { getIcon } from '@/lib/icons';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

const defaultHero: LandingContent['hero'] = {
  ...landingContentSeed.hero,
  badge: homeHero.badge,
  title: homeHero.title,
  highlight: homeHero.highlight,
  description: homeHero.description,
  stats: homeHero.stats.map((s) => ({
    value: s.value,
    label: s.label,
    icon: s.icon ?? 'briefcase',
  })),
};

export function HomeHero({ data = defaultHero }: { data?: LandingContent['hero'] }) {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 pb-8 pt-10 md:pt-14'>
      <Container>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <motion.div initial='hidden' animate='visible' variants={fadeInLeft}>
            <Badge variant='secondary' className='mb-4 gap-1.5 bg-primary/10 text-primary'>
              <BadgeCheck className='size-3.5' />
              {data.badge}
            </Badge>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]'>
              {data.title} <span className='text-primary'>{data.highlight}</span>
            </h1>
            <p className='mt-4 max-w-xl text-muted-foreground md:text-lg'>{data.description}</p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <Button
                size='lg'
                className='h-11 px-5'
                render={
                  <Link
                    href={data.primaryCta.href}
                    target={data.primaryCta.newTab ? '_blank' : undefined}
                    rel={data.primaryCta.newTab ? 'noopener noreferrer' : undefined}
                  />
                }
              >
                {data.primaryCta.label}
                <ArrowRight data-icon='inline-end' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='h-11 px-5 border-primary text-primary hover:bg-primary/5'
                render={
                  <Link
                    href={data.secondaryCta.href}
                    target={data.secondaryCta.newTab ? '_blank' : undefined}
                    rel={data.secondaryCta.newTab ? 'noopener noreferrer' : undefined}
                  />
                }
              >
                {data.secondaryCta.label}
              </Button>
            </div>
            <div className='mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {data.stats.map((stat) => (
                <div key={stat.label} className='rounded-xl border bg-background p-3 shadow-sm'>
                  <StatItem value={stat.value} label={stat.label} icon={getIcon(stat.icon)} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeInRight}
            className='relative'
          >
            <ImagePlaceholder
              label={data.media.label}
              className='aspect-4/3 min-h-60 rounded-2xl shadow-xl shadow-primary/10'
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
