import { loadPublicCaseStudies } from '@/lib/public-entities';
import { CaseStudiesHero } from '@/features/case-studies/components/case-studies-hero';
import { CaseStudiesList } from '@/features/case-studies/components/case-studies-list';
import { CaseStudiesStats } from '@/features/case-studies/components/case-studies-stats';

export async function CaseStudiesPage() {
  const items = await loadPublicCaseStudies();

  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesList items={items} />
      <CaseStudiesStats />
    </>
  );
}
