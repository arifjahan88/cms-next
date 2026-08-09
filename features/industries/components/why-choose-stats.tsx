import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { StatItem } from "@/components/shared/stat-item";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { industriesStats } from "@/features/industries/data/industries";
import { getIcon } from "@/lib/icons";

export function IndustriesWhyChooseStats() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Why Industry Leaders Choose Zaimah"
          description="Proven delivery metrics across complex, domain-specific products."
          align="center"
        />
        <FadeIn>
          <div className="grid gap-6 rounded-2xl border bg-background p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4 md:p-10">
            {industriesStats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={getIcon(stat.icon)}
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
