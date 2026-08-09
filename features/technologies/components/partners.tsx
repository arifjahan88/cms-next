import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { techPartners } from "@/features/technologies/data/technologies";

export function TechnologiesPartners() {
  return (
    <section className="border-y bg-surface py-12 md:py-16">
      <Container>
        <SectionHeader
          title="Technology Partners"
          description="We collaborate with leading platforms to accelerate delivery and reliability."
          align="center"
          className="mb-8"
        />
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {techPartners.map((name) => (
              <div
                key={name}
                className="flex h-12 min-w-[120px] items-center justify-center rounded-lg border bg-background px-4 text-sm font-semibold text-muted-foreground grayscale transition hover:grayscale-0 hover:text-foreground"
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
