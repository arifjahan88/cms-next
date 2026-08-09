import { HomeHero } from "@/features/home/components/hero";
import { TrustedBy } from "@/features/home/components/trusted-by";
import { CoreServices } from "@/features/home/components/core-services";
import { IndustriesStrip } from "@/features/home/components/industries-strip";
import { WhyChoose } from "@/features/home/components/why-choose";
import { FeaturedCaseStudies } from "@/features/home/components/featured-case-studies";
import { Testimonials } from "@/features/home/components/testimonials";
import { ContactCta } from "@/features/home/components/contact-cta";

export function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustedBy />
      <CoreServices />
      <IndustriesStrip />
      <WhyChoose />
      <FeaturedCaseStudies />
      <Testimonials />
      <ContactCta />
    </>
  );
}
