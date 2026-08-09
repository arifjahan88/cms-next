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
import { getIcon } from '@/lib/icons';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

export function HomeHero() {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 pb-8 pt-10 md:pt-14'>
      <Container>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <motion.div initial='hidden' animate='visible' variants={fadeInLeft}>
            <Badge variant='secondary' className='mb-4 gap-1.5 bg-primary/10 text-primary'>
              <BadgeCheck className='size-3.5' />
              {homeHero.badge}
            </Badge>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]'>
              {homeHero.title} <span className='text-primary'>{homeHero.highlight}</span>
            </h1>
            <p className='mt-4 max-w-xl text-muted-foreground md:text-lg'>{homeHero.description}</p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <Button size='lg' className='h-11 px-5' render={<Link href='/book-consultation' />}>
                Book Free Consultation
                <ArrowRight data-icon='inline-end' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='h-11 px-5 border-primary text-primary hover:bg-primary/5'
                render={<Link href='/case-studies' />}
              >
                View Case Studies
              </Button>
            </div>
            <div className='mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {homeHero.stats.map((stat) => (
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
              label='[Main Hero Dashboard/Mobile Illustration]'
              className='aspect-4/3 min-h-60 rounded-2xl shadow-xl shadow-primary/10'
            />
            {/* <div className="absolute -bottom-4 -left-4 hidden rounded-xl border bg-white px-4 py-3 shadow-lg sm:block">
              <p className="text-xs text-muted-foreground">Active projects</p>
              <p className="text-lg font-bold text-primary">48 worldwide</p>
            </div> */}
          </motion.div>
        </div>

        {/* <div className="mt-14 border-t pt-8">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            We Work With Modern Technologies
          </p>
          <Marquee>
            {techLogos.map((logo) => (
              <span
                key={logo}
                className="inline-flex h-10 items-center rounded-full border bg-background px-4 text-sm font-medium text-muted-foreground"
              >
                {logo}
              </span>
            ))}
          </Marquee>
        </div> */}
      </Container>
    </section>
  );
}
