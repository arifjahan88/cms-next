import { CareersHero } from '@/features/careers/components/careers-hero';
import { CareersStats } from '@/features/careers/components/careers-stats';
import { CultureSection } from '@/features/careers/components/culture-section';
import { BenefitsSection } from '@/features/careers/components/benefits-section';
import { JobList } from '@/features/careers/components/job-list';
import { CareersCta } from '@/features/careers/components/careers-cta';

export function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersStats />
      <CultureSection />
      <BenefitsSection />
      <JobList />
      <CareersCta />
    </>
  );
}
