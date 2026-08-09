import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import { careersHero } from "@/features/careers/data/careers";

export function CareersHero() {
  return (
    <PageHero
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      eyebrow="Careers at Zaimah"
      title={careersHero.title}
      highlight={careersHero.highlight}
      description={careersHero.description}
      actions={{
        primary: { label: "View Open Roles", href: "#open-positions" },
        secondary: { label: "Send Your CV", href: "#send-cv" },
      }}
    >
      <div className="relative">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
          <ImagePlaceholder
            label="[Team Collaboration Photo]"
            className="absolute inset-0 rounded-xl"
          />
        </div>
        <div className="absolute -bottom-4 left-4 right-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur sm:left-auto sm:right-6 sm:w-64">
          <Badge className="mb-2 bg-primary/10 text-primary">We’re hiring</Badge>
          <p className="text-sm font-semibold">18 open roles across 4 countries</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Engineering, design, product, and more.
          </p>
        </div>
      </div>
    </PageHero>
  );
}
