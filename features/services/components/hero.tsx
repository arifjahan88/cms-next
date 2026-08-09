import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import { servicesHero, servicesHeroChips } from "@/features/services/data/services";

const chipPositions = [
  "left-2 top-4 sm:-left-3 sm:top-8",
  "right-2 top-6 sm:-right-4 sm:top-12",
  "left-4 bottom-20 sm:-left-6 sm:bottom-24",
  "right-4 top-1/2 sm:-right-3",
  "right-8 bottom-10 sm:-right-1 sm:bottom-14",
  "left-1/3 bottom-6 sm:left-1/4",
];

export function ServicesHero() {
  return (
    <PageHero
      breadcrumb={servicesHero.breadcrumb}
      eyebrow={servicesHero.eyebrow}
      title={servicesHero.title}
      highlight={servicesHero.highlight}
      description={servicesHero.description}
      actions={servicesHero.actions}
    >
      <div className="relative">
        <ImagePlaceholder
          label="[Services Hero Illustration]"
          className="aspect-4/3 min-h-60 rounded-2xl shadow-xl shadow-primary/10"
        />
        {servicesHeroChips.map((chip, index) => (
          <span
            key={chip}
            className={`absolute z-10 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-md ${chipPositions[index] ?? chipPositions[0]}`}
          >
            {chip}
          </span>
        ))}
      </div>
    </PageHero>
  );
}
