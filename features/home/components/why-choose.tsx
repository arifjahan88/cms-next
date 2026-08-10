import { Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { SectionHeader } from '@/components/shared/section-header';
import { Reveal } from '@/components/shared/motion/reveal';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { whyChoose } from '@/features/home/data/home';
import { getIcon } from '@/lib/icons';

export function WhyChoose() {
  return (
    <section className='py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Why Choose Zamil Technologies?'
          accent
          action={{ label: 'More About Us', href: '/about' }}
        />
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <Reveal direction='left'>
            <div className='relative overflow-hidden rounded-2xl border shadow-lg'>
              <div className='relative aspect-4/3'>
                <ImagePlaceholder
                  label='[Company Culture/Office Video Placeholder]'
                  className='absolute inset-0 size-full min-h-0 rounded-none border-0'
                />
                <button
                  type='button'
                  className='absolute inset-0 flex items-center justify-center bg-brand-navy/20 transition hover:bg-brand-navy/30'
                  aria-label='Play video'
                >
                  <span className='flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-xl'>
                    <Play className='size-7 fill-current' />
                  </span>
                </button>
              </div>
              <Badge className='absolute bottom-4 left-4 bg-white text-primary shadow'>
                25+ Years of Experience
              </Badge>
            </div>
          </Reveal>
          <div>
            <StaggerChildren className='grid gap-4 sm:grid-cols-2'>
              {whyChoose.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <StaggerItem key={item.title}>
                    <div className='rounded-xl border bg-background p-4 shadow-sm'>
                      <span className='mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                        <Icon className='size-5' />
                      </span>
                      <h3 className='font-semibold'>{item.title}</h3>
                      <p className='mt-1 text-sm text-muted-foreground'>{item.description}</p>
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
