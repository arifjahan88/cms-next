import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { StaggerChildren, StaggerItem } from "@/components/shared/motion/stagger-children";
import { industriesHero, industriesHeroFeatures } from "@/features/industries/data/industries";
import { getIcon } from "@/lib/icons";

export function IndustriesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-primary/5 py-12 md:py-16">
      <Container>
        <PageBreadcrumb items={industriesHero.breadcrumb} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              {industriesHero.eyebrow}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {industriesHero.title}{" "}
              <span className="text-primary">{industriesHero.highlight}</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
              {industriesHero.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-11 px-5"
                render={<Link href={industriesHero.actions.primary.href} />}
              >
                {industriesHero.actions.primary.label}
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-5 border-primary text-primary hover:bg-primary/5"
                render={<Link href={industriesHero.actions.secondary.href} />}
              >
                {industriesHero.actions.secondary.label}
              </Button>
            </div>
            <StaggerChildren className="mt-8 grid gap-3 sm:grid-cols-2">
              {industriesHeroFeatures.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <StaggerItem key={feature.title}>
                    <div className="rounded-xl border bg-background p-4 shadow-sm">
                      <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </span>
                      <h3 className="text-sm font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
          <ImagePlaceholder
            label="[Industries City Illustration]"
            className="aspect-16/10 min-h-[280px] rounded-2xl shadow-lg"
          />
        </div>
      </Container>
    </section>
  );
}
