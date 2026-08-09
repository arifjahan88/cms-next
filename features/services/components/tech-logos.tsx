import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { TechIcon } from "@/components/shared/tech-icon";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { servicesTechLogos } from "@/features/services/data/services";

export function ServicesTechLogos() {
  return (
    <section className="border-y bg-surface py-12 md:py-16">
      <Container>
        <SectionHeader
          title="Technologies We Work With"
          description="Modern stacks chosen for performance, maintainability, and long-term scalability."
          align="center"
          className="mb-8"
        />
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {servicesTechLogos.map((tech) => (
              <TechIcon key={tech} label={tech} className="size-14" />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
