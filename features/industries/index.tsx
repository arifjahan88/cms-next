import { IndustriesHero } from '@/features/industries/components/hero';
import { IndustriesGrid } from '@/features/industries/components/industries-grid';
import { IndustriesWhyChooseStats } from '@/features/industries/components/why-choose-stats';
import { IndustriesSuccessStories } from '@/features/industries/components/success-stories';
import { IndustriesCta } from '@/features/industries/components/cta';

export function IndustriesPage() {
  return (
    <>
      <IndustriesHero />
      <IndustriesGrid />
      <IndustriesWhyChooseStats />
      <IndustriesSuccessStories />
      <IndustriesCta />
    </>
  );
}
