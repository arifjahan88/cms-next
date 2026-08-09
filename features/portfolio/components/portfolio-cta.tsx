import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { getIcon } from '@/lib/icons';
import { portfolioCtaFeatures } from '@/features/portfolio/data/portfolio';

export function PortfolioCta() {
  return (
    <section className='py-12 md:py-16'>
      <Container>
        <div className='overflow-hidden rounded-2xl bg-primary/5 px-6 py-10 md:px-10 md:py-12'>
          <div className='grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr_auto] lg:gap-8'>
            <ImagePlaceholder label='[Rocket Illustration]' className='min-h-40 w-full' />
            <div>
              <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
                Have a Project in Mind?
              </h2>
              <p className='mt-3 max-w-xl text-sm text-muted-foreground md:text-base'>
                Let&apos;s turn your idea into a powerful digital solution. We&apos;re ready to help
                you build, scale and grow.
              </p>
              <div className='mt-5 flex flex-wrap gap-x-5 gap-y-3'>
                {portfolioCtaFeatures.map((feature) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div
                      key={feature.title}
                      className='inline-flex items-center gap-2 text-sm font-medium text-foreground'
                    >
                      <span className='flex size-7 items-center justify-center text-primary'>
                        <Icon className='size-4 stroke-[1.5]' />
                      </span>
                      {feature.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              size='lg'
              className='h-11 shrink-0 px-5'
              render={<Link href='/book-consultation' />}
            >
              Book Free Consultation
              <ArrowRight data-icon='inline-end' />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
