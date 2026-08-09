import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { aboutStats } from "@/features/about/data/about";
import { getIcon } from "@/lib/icons";

export function AboutStatsBanner() {
  return (
    <section className="bg-brand-navy py-12 text-brand-navy-foreground md:py-16">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {aboutStats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Icon className="size-5 stroke-[1.5]" />
                  </span>
                  <p className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/70 md:text-sm">
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
