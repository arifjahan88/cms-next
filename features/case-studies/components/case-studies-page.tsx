import { CaseStudiesHero } from "@/features/case-studies/components/case-studies-hero";
import { CaseStudiesList } from "@/features/case-studies/components/case-studies-list";
import { CaseStudiesStats } from "@/features/case-studies/components/case-studies-stats";

export function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesList />
      <CaseStudiesStats />
    </>
  );
}
