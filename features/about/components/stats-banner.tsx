import { Container } from "@/components/shared/container";
import { StatItem } from "@/components/shared/stat-item";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { aboutStats } from "@/features/about/data/about";
import { getIcon } from "@/lib/icons";

export function AboutStatsBanner() {
  return (
    <section className="bg-brand-navy py-12 text-brand-navy-foreground md:py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutStats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={getIcon(stat.icon)}
                light
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
