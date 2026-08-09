import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { servicesFaqs } from "@/features/services/data/services";

export function ServicesFaq() {
  const midpoint = Math.ceil(servicesFaqs.length / 2);
  const leftFaqs = servicesFaqs.slice(0, midpoint);
  const rightFaqs = servicesFaqs.slice(midpoint);

  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader title="Frequently Asked Questions" align="center" />
        <FadeIn>
          <div className="grid gap-4 lg:grid-cols-2">
            <Accordion className="rounded-xl border bg-background px-4 shadow-sm">
              {leftFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`left-${index}`}>
                  <AccordionTrigger className="py-4 text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Accordion className="rounded-xl border bg-background px-4 shadow-sm">
              {rightFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`right-${index}`}>
                  <AccordionTrigger className="py-4 text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
