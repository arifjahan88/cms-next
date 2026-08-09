import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { careersCta } from '@/features/careers/data/careers';

export function CareersCta() {
  return (
    <section id='send-cv' className='scroll-mt-28 py-12 md:py-16'>
      <Container>
        <div className='overflow-hidden rounded-2xl bg-brand-navy text-brand-navy-foreground'>
          <div className='grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[auto_1fr] lg:gap-12'>
            <ImagePlaceholder
              label='[Envelope / CV Illustration]'
              className='min-h-44 w-full border-white/20 bg-white/5 text-white/70 lg:w-56'
            />
            <div>
              <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>{careersCta.title}</h2>
              <p className='mt-3 max-w-xl text-sm text-white/80 md:text-base'>
                {careersCta.description}
              </p>
              <div className='mt-6'>
                <Button
                  size='lg'
                  className='h-11 bg-white px-5 text-primary hover:bg-white/90'
                  render={<Link href={careersCta.primary.href} />}
                >
                  {careersCta.primary.label}
                  <ArrowRight data-icon='inline-end' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
