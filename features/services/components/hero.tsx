import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import { servicesHero, servicesHeroChips } from "@/features/services/data/services";

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
        {servicesHeroChips.map((chip, index) => {
          const positions = [
            "left-2 top-4 sm:-left-3 sm:top-8",
            "right-2 top-10 sm:-right-4 sm:top-16",
            "left-4 bottom-16 sm:-left-6",
            "right-6 bottom-8 sm:-right-2",
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          ];
          return (
            <span
              key={chip}
              className={`absolute z-10 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-md ${positions[index] ?? positions[0]}`}
            >
              {chip}
            </span>
          );
        })}
      </div>
    </PageHero>
  );
}
