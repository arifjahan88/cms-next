import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { benefits } from "@/features/careers/data/careers";
import { getIcon } from "@/lib/icons";

export function BenefitsSection() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Benefits & Perks"
          title="Support that goes beyond the paycheck"
          description="We invest in wellbeing, growth, and the flexibility people need to do great work."
          align="center"
        />
        <FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {benefits.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 rounded-xl border bg-background px-4 py-6 text-center shadow-sm"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
