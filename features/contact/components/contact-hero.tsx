import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { contactHero } from "@/features/contact/data/contact";
import { getIcon } from "@/lib/icons";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16">
      <Container>
        <PageBreadcrumb items={contactHero.breadcrumb} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {contactHero.title}{" "}
              <span className="text-primary">{contactHero.highlight}</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
              {contactHero.description}
            </p>

            <StaggerChildren className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {contactHero.features.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <StaggerItem key={feature.title} hoverLift={false}>
                    <div className="flex h-full flex-col gap-2 rounded-xl border border-border/80 bg-background p-3.5 shadow-sm">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4 stroke-[1.5]" />
                      </span>
                      <h3 className="text-sm font-bold leading-snug text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-xs leading-snug text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>

          <div className="relative">
            <ImagePlaceholder
              label="[World Map / 3D Z Illustration]"
              className="aspect-4/3 min-h-70 rounded-2xl shadow-lg shadow-primary/10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
