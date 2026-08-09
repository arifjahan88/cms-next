import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { partners } from '@/features/about/data/about';

export function AboutPartners() {
  return (
    <section className='py-12 md:py-16'>
      <Container>
        <SectionHeader
          title='Partners & Certifications'
          description='Trusted alliances and compliance-minded practices that protect our clients.'
          align='center'
          className='mb-8'
        />
        <FadeIn>
          <StaggerChildren className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4'>
            {partners.map((partner) => (
              <StaggerItem key={partner.name} hoverLift={false}>
                <ImagePlaceholder
                  label={partner.label}
                  className='flex h-16 min-h-16 items-center justify-center rounded-lg bg-background px-3 text-[11px] sm:h-20 sm:min-h-20 sm:text-xs'
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </FadeIn>
      </Container>
    </section>
  );
}
