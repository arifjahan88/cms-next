import { TechnologiesHero } from '@/features/technologies/components/hero';
import { TechnologiesExpertise } from '@/features/technologies/components/expertise-grid';
import { TechnologiesStackGroups } from '@/features/technologies/components/stack-groups';
import { TechnologiesApproach } from '@/features/technologies/components/approach';
import { TechnologiesPartners } from '@/features/technologies/components/partners';
import { CtaBanner } from '@/components/shared/cta-banner';

export function TechnologiesPage() {
  return (
    <>
      <TechnologiesHero />
      <TechnologiesExpertise />
      <TechnologiesStackGroups />
      <TechnologiesApproach />
      <TechnologiesPartners />
      <CtaBanner
        variant='navy'
        title='Need help choosing the right stack?'
        description='Our architects can recommend a pragmatic technology plan for your product and team.'
        primary={{ label: 'Book Free Consultation', href: '/book-consultation' }}
        secondary={{ label: 'Explore Services', href: '/services' }}
      />
    </>
  );
}
