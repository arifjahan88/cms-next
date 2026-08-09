import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import { consultationHero } from "@/features/consultation/data/consultation";
import { getIcon } from "@/lib/icons";

export function ConsultationHero() {
  return (
    <PageHero
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Book Consultation" }]}
      eyebrow="Free Consultation"
      title={consultationHero.title}
      description={consultationHero.description}
      actions={{
        primary: { label: "Start Inquiry", href: "#inquiry" },
        secondary: { label: "Contact Us", href: "/contact" },
      }}
    >
      <div className="relative">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
          <ImagePlaceholder
            label="[Consultation Calendar Illustration]"
            className="absolute inset-0 rounded-xl"
          />
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {consultationHero.highlights.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li key={item.label} className="rounded-xl border bg-background p-3 shadow-sm">
                <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </PageHero>
  );
}
