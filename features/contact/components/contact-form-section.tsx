import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { ContactForm } from "@/features/contact/components/contact-form";
import { OfficesMap } from "@/features/contact/components/offices-map";

export function ContactFormSection() {
  return (
    <section id="message" className="scroll-mt-28 bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Get in Touch"
          title="Tell us about your project"
          description="Prefer email or a call? Use the cards above—or send a detailed message here."
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <ContactForm />
          </FadeIn>
          <FadeIn delay={0.1}>
            <OfficesMap />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
