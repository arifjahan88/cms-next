import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { careersHero } from '@/features/careers/data/careers';

export function CareersHero() {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16'>
      <Container>
        <PageBreadcrumb items={careersHero.breadcrumb} />
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <FadeIn>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
                {careersHero.titleBefore}
                <span className='text-primary'>{careersHero.highlight1}</span>
                {careersHero.titleMiddle}
                <span className='text-primary'>{careersHero.highlight2}</span>
              </h1>
              <p className='mt-4 max-w-xl text-muted-foreground md:text-lg'>
                {careersHero.description}
              </p>
              <div className='mt-6 flex flex-wrap gap-3'>
                <Button
                  size='lg'
                  className='h-11 px-5'
                  render={<Link href={careersHero.actions.primary.href} />}
                >
                  {careersHero.actions.primary.label}
                  <ArrowRight data-icon='inline-end' />
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='h-11 px-5 border-primary text-primary hover:bg-primary/5'
                  render={<Link href={careersHero.actions.secondary.href} />}
                >
                  {careersHero.actions.secondary.label}
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className='relative'>
              <ImagePlaceholder
                label='[Team Collaboration Photo]'
                className='aspect-4/3 min-h-64 rounded-2xl shadow-xl shadow-primary/10'
              />
              <div className='absolute -bottom-4 left-4 right-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur sm:left-auto sm:right-6 sm:w-72'>
                <p className='text-sm font-semibold leading-snug text-foreground'>
                  {careersHero.overlay.title}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
