import { ContactHero } from "@/features/contact/components/contact-hero";
import { InfoCards } from "@/features/contact/components/info-cards";
import { ContactFormSection } from "@/features/contact/components/contact-form-section";
import { ContactFaq } from "@/features/contact/components/contact-faq";
import { CtaBanner } from "@/components/shared/cta-banner";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <InfoCards />
      <ContactFormSection />
      <ContactFaq />
      <CtaBanner
        variant="navy"
        title="Ready to Start Your Project?"
        description="Book a free consultation and get a clear roadmap for your next digital product."
        primary={{ label: "Book Free Consultation", href: "/book-consultation" }}
        secondary={{ label: "View Our Work", href: "/portfolio" }}
      >
        <ImagePlaceholder
          label="[CTA Graphic]"
          className="min-h-[180px] w-full max-w-xs border-white/20 bg-white/5 text-white/70 lg:min-h-[220px]"
        />
      </CtaBanner>
    </>
  );
}
