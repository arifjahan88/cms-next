import { loadPublicJobs } from '@/lib/public-entities';
import { CareersHero } from '@/features/careers/components/careers-hero';
import { CareersStats } from '@/features/careers/components/careers-stats';
import { CultureSection } from '@/features/careers/components/culture-section';
import { BenefitsSection } from '@/features/careers/components/benefits-section';
import { JobList } from '@/features/careers/components/job-list';
import { CareersCta } from '@/features/careers/components/careers-cta';

export async function CareersPage() {
  const jobs = await loadPublicJobs();

  return (
    <>
      <CareersHero />
      <CareersStats />
      <CultureSection />
      <BenefitsSection />
      <JobList jobs={jobs} />
      <CareersCta />
    </>
  );
}
