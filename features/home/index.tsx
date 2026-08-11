import type { ReactNode } from 'react';
import { cacheTag } from 'next/cache';
import { HomeHero } from '@/features/home/components/hero';
import { TrustedBy } from '@/features/home/components/trusted-by';
import { CoreServices } from '@/features/home/components/core-services';
import { IndustriesStrip } from '@/features/home/components/industries-strip';
import { WhyChoose } from '@/features/home/components/why-choose';
import { FeaturedCaseStudies } from '@/features/home/components/featured-case-studies';
import { Testimonials } from '@/features/home/components/testimonials';
import { ContactCta } from '@/features/home/components/contact-cta';
import type { LandingContent, SectionId } from '@/features/dashboard/data/landing-cms';
import {
  LANDING_CACHE_TAG,
  landingPageTag,
  loadPublicLandingSections,
} from '@/db/queries/landing';

const SECTION_RENDERERS: Record<
  SectionId,
  (content: LandingContent[SectionId]) => ReactNode
> = {
  hero: (content) => <HomeHero data={content as LandingContent['hero']} />,
  trustedBy: (content) => <TrustedBy data={content as LandingContent['trustedBy']} />,
  services: (content) => <CoreServices data={content as LandingContent['services']} />,
  industries: (content) => <IndustriesStrip data={content as LandingContent['industries']} />,
  whyChoose: (content) => <WhyChoose data={content as LandingContent['whyChoose']} />,
  caseStudies: (content) => (
    <FeaturedCaseStudies data={content as LandingContent['caseStudies']} />
  ),
  testimonials: (content) => <Testimonials data={content as LandingContent['testimonials']} />,
  contactCta: (content) => <ContactCta data={content as LandingContent['contactCta']} />,
};

export async function HomePage() {
  'use cache';
  cacheTag(LANDING_CACHE_TAG, landingPageTag('home'));

  const sections = await loadPublicLandingSections('home');

  return (
    <>
      {sections.map((section) => (
        <div key={section.sectionId}>{SECTION_RENDERERS[section.sectionId](section.content)}</div>
      ))}
    </>
  );
}
