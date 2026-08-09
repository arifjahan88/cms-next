import { Container } from "@/components/shared/container";
import { StatItem } from "@/components/shared/stat-item";
import { getIcon } from "@/lib/icons";
import { caseStudiesStats } from "@/features/case-studies/data/case-studies";

export function CaseStudiesStats() {
  return (
    <section className="pb-12 md:pb-16">
      <Container>
        <div className="rounded-2xl bg-brand-navy px-6 py-10 text-brand-navy-foreground md:px-12 md:py-12">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Results that compound across every engagement
            </h2>
            <p className="mt-3 text-sm text-white/70 md:text-base">
              From discovery to scale, our delivery teams help organizations ship
              confidently and grow with confidence.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudiesStats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={getIcon(stat.icon)}
                light
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
