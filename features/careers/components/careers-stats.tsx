import { Container } from "@/components/shared/container";
import { StatItem } from "@/components/shared/stat-item";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { careersStats } from "@/features/careers/data/careers";
import { getIcon } from "@/lib/icons";

export function CareersStats() {
  return (
    <section className="border-y bg-surface py-10">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {careersStats.map((stat) => (
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
