import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { contactFaqs } from "@/features/contact/data/contact";
import { getIcon } from "@/lib/icons";

export function ContactFaq() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          description="Quick answers before you reach out—or book a free consultation."
          align="center"
        />
        <FadeIn>
          <StaggerChildren className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {contactFaqs.map((faq) => {
              const Icon = getIcon(faq.icon);
              return (
                <StaggerItem key={faq.question}>
                  <article className="group flex h-full flex-col gap-3 rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                    </div>
                    <h3 className="text-base font-semibold leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </FadeIn>
      </Container>
    </section>
  );
}
