import { BadgeCheck } from "lucide-react";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageHero } from "@/components/shared/page-hero";
import { contactHero } from "@/features/contact/data/contact";

export function ContactHero() {
  return (
    <PageHero
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      eyebrow="Contact Us"
      title={contactHero.title}
      highlight={contactHero.highlight}
      description={contactHero.description}
      actions={{
        primary: { label: "Send a Message", href: "#message" },
        secondary: { label: "Book Consultation", href: "/book-consultation" },
      }}
    >
      <div className="relative">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
          <ImagePlaceholder
            label="[Hero 3D Visual/Map Image]"
            className="absolute inset-0 rounded-xl"
          />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {contactHero.trustBadges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium shadow-sm"
            >
              <BadgeCheck className="size-3.5 text-primary" />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </PageHero>
  );
}
