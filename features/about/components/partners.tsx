import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { certifications } from "@/features/about/data/about";

export function AboutPartners() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          title="Partners & Certifications"
          description="Trusted alliances and compliance-minded practices that protect our clients."
          align="center"
          className="mb-8"
        />
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {certifications.map((name) => (
              <div
                key={name}
                className="flex h-12 min-w-[140px] items-center justify-center rounded-lg border bg-background px-4 text-sm font-semibold text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
