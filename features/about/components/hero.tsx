import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { FadeIn } from "@/components/shared/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { aboutHero, aboutHeroStats } from "@/features/about/data/about";
import { getIcon } from "@/lib/icons";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 pb-8 pt-12 md:pb-12 md:pt-16">
      <Container>
        <PageBreadcrumb items={aboutHero.breadcrumb} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {aboutHero.title}{" "}
                <span className="text-primary">{aboutHero.highlight}</span>
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                {aboutHero.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="h-11 px-5"
                  render={<Link href={aboutHero.actions.primary.href} />}
                >
                  {aboutHero.actions.primary.label}
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-5 border-primary text-primary hover:bg-primary/5"
                  render={<Link href={aboutHero.actions.secondary.href} />}
                >
                  {aboutHero.actions.secondary.label}
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ImagePlaceholder
              label="[Office Team Photo]"
              className="aspect-16/10 min-h-64 rounded-2xl shadow-lg shadow-primary/10"
            />
          </FadeIn>
        </div>

        <StaggerChildren className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:-mt-6 lg:gap-4">
          {aboutHeroStats.map((stat) => {
            const Icon = getIcon(stat.icon);
            return (
              <StaggerItem key={stat.label} hoverLift={false}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-border/80 bg-background p-3 shadow-md sm:p-4">
                  <span className="flex size-8 items-center justify-center text-primary">
                    <Icon className="size-4 stroke-[1.5]" />
                  </span>
                  <p className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
