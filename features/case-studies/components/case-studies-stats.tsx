import { Container } from "@/components/shared/container";
import { caseStudiesStats } from "@/features/case-studies/data/case-studies";
import { getIcon } from "@/lib/icons";

export function CaseStudiesStats() {
  return (
    <section className="pb-12 md:pb-16">
      <Container>
        <div className="rounded-2xl bg-brand-navy px-6 py-10 text-brand-navy-foreground md:px-12 md:py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudiesStats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
                >
                  <span className="flex size-10 items-center justify-center text-white/90">
                    <Icon className="size-5 stroke-[1.5]" />
                  </span>
                  <p className="text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
