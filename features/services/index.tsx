import { ServicesHero } from "@/features/services/components/hero";
import { ServicesCoreGrid } from "@/features/services/components/core-services";
import { ServicesComparison } from "@/features/services/components/comparison-table";
import { ServicesProcess } from "@/features/services/components/process-timeline";
import { ServicesTechLogos } from "@/features/services/components/tech-logos";
import { ServicesIndustriesMini } from "@/features/services/components/industries-mini";
import { ServicesFeaturedCases } from "@/features/services/components/featured-cases";
import { ServicesWhyChoose } from "@/features/services/components/why-choose";
import { ServicesFaq } from "@/features/services/components/faq";
import { ServicesMiniCta } from "@/features/services/components/mini-cta";
import { ContactCta } from "@/features/home/components/contact-cta";
import { Container } from "@/components/shared/container";

export function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesCoreGrid />

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
            <ServicesComparison embedded />
            <ServicesProcess embedded />
          </div>
        </Container>
      </section>

      <ServicesTechLogos />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            <ServicesIndustriesMini embedded />
            <ServicesFeaturedCases embedded />
            <ServicesWhyChoose embedded />
          </div>
        </Container>
      </section>

      <ServicesFaq />
      <ServicesMiniCta />
      <ContactCta />
    </>
  );
}
