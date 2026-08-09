import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import {
  techHeroPillars,
  technologiesHero,
} from "@/features/technologies/data/technologies";
import { getIcon } from "@/lib/icons";

export function TechnologiesHero() {
  return (
    <PageHero
      breadcrumb={technologiesHero.breadcrumb}
      eyebrow={technologiesHero.eyebrow}
      title={technologiesHero.title}
      highlight={technologiesHero.highlight}
      description={technologiesHero.description}
      actions={technologiesHero.actions}
    >
      <div className="space-y-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
          <ImagePlaceholder
            label="[Technologies Hero Illustration]"
            className="absolute inset-0 rounded-xl"
          />
        </div>
        <StaggerChildren className="grid grid-cols-2 gap-3">
          {techHeroPillars.map((pillar) => {
            const Icon = getIcon(pillar.icon);
            return (
              <StaggerItem key={pillar.title}>
                <div className="rounded-xl border bg-background p-3 shadow-sm">
                  <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-sm font-semibold">{pillar.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </PageHero>
  );
}
