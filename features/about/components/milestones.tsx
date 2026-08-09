import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { milestones } from '@/features/about/data/about';

export function AboutMilestones() {
  return (
    <section className='bg-surface py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Our Journey'
          description='Milestones that shaped Zaimah Technologies from 2000 to today.'
          align='center'
        />
        <FadeIn>
          <div className='relative'>
            <div
              className='absolute top-4 right-8 left-8 hidden h-px bg-primary/30 md:block'
              aria-hidden
            />
            <StaggerChildren className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4'>
              {milestones.map((item) => (
                <StaggerItem key={item.year} hoverLift={false}>
                  <div className='relative flex flex-col items-center text-center'>
                    <span className='relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm'>
                      <span className='size-2.5 rounded-full bg-primary' />
                    </span>
                    <p className='mt-3 text-sm font-bold text-primary'>{item.year}</p>
                    <h3 className='mt-1.5 text-sm font-semibold text-foreground'>{item.title}</h3>
                    <p className='mt-1.5 text-[11px] leading-snug text-muted-foreground sm:text-xs'>
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
