import { Play } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { companyFeatures, companyOverview } from '@/features/about/data/about';
import { getIcon } from '@/lib/icons';

export function AboutCompanyOverview() {
  return (
    <section className='py-16 md:py-20'>
      <Container>
        <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-12'>
          <FadeIn>
            <div className='relative overflow-hidden rounded-2xl border shadow-lg'>
              <div className='relative aspect-4/3'>
                <ImagePlaceholder
                  label='[Company Story Video]'
                  className='absolute inset-0 rounded-none border-0'
                />
                <button
                  type='button'
                  className='absolute inset-0 flex items-center justify-center bg-brand-navy/25 transition hover:bg-brand-navy/35'
                  aria-label='Play company video'
                >
                  <span className='flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-xl'>
                    <Play className='size-7 fill-current pl-0.5' />
                  </span>
                </button>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-primary'>
                {companyOverview.eyebrow}
              </p>
              <h2 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'>
                {companyOverview.title}
              </h2>
              <p className='mt-4 text-sm leading-relaxed text-muted-foreground md:text-base'>
                {companyOverview.description}
              </p>
            </FadeIn>

            <StaggerChildren className='mt-8 grid gap-4 sm:grid-cols-2'>
              {companyFeatures.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <StaggerItem key={item.title} hoverLift={false}>
                    <div className='flex gap-3'>
                      <span className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                        <Icon className='size-4 stroke-[1.5]' />
                      </span>
                      <div>
                        <h3 className='text-sm font-semibold text-foreground'>{item.title}</h3>
                        <p className='mt-0.5 text-xs leading-snug text-muted-foreground sm:text-sm'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
      </Container>
    </section>
  );
}
