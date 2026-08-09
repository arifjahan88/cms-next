import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import { aboutHero } from "@/features/about/data/about";

export function AboutHero() {
  return (
    <PageHero
      breadcrumb={aboutHero.breadcrumb}
      eyebrow={aboutHero.eyebrow}
      title={aboutHero.title}
      highlight={aboutHero.highlight}
      description={aboutHero.description}
      actions={aboutHero.actions}
    >
      <div className="relative pb-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
          <ImagePlaceholder
            label="[Office Team Photo]"
            className="absolute inset-0 rounded-xl"
          />
        </div>
        <div className="absolute -bottom-4 left-4 right-4 grid grid-cols-3 gap-2 sm:-bottom-5 sm:left-6 sm:right-auto sm:gap-3">
          {aboutHero.floatingStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-white px-3 py-2.5 shadow-lg"
            >
              <p className="text-lg font-bold text-primary sm:text-xl">
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageHero>
  );
}
