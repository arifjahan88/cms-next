import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { careersStats } from "@/features/careers/data/careers";
import { getIcon } from "@/lib/icons";

export function CareersStats() {
  return (
    <section className="border-y bg-surface py-10 md:py-12">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {careersStats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5 stroke-[1.5]" />
                  </span>
                  <p className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground md:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
