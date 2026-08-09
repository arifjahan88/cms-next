import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { TechIcon } from '@/components/shared/tech-icon';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { techPartners } from '@/features/technologies/data/technologies';

export function TechnologiesPartners() {
  return (
    <section className='border-y bg-surface py-12 md:py-16'>
      <Container>
        <SectionHeader title='Technology Partners' align='center' className='mb-8' />
        <FadeIn>
          <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6'>
            {techPartners.map((name) => (
              <TechIcon
                key={name}
                label={name}
                className='size-16 grayscale transition hover:grayscale-0'
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
