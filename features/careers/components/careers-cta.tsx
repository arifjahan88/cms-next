import { CtaBanner } from "@/components/shared/cta-banner";

export function CareersCta() {
  return (
    <div id="send-cv" className="scroll-mt-28">
      <CtaBanner
        variant="navy"
        title="Don't see the right role?"
        description="Send us your CV and tell us what you're great at. We'll reach out when a matching opportunity opens."
        primary={{ label: "Send Your CV", href: "/contact" }}
        secondary={{ label: "Contact Talent Team", href: "mailto:careers@zaimah.tech" }}
      />
    </div>
  );
}
