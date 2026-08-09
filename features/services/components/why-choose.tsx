import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { whyChooseServices } from "@/features/services/data/services";

export function ServicesWhyChoose({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Why Choose Zaimah for Services"
        description="A delivery partner focused on outcomes, clarity, and long-term product health."
        className={embedded ? "mb-5" : undefined}
      />
      <StaggerChildren
        className={
          embedded
            ? "grid gap-3"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {whyChooseServices.map((item) => (
          <StaggerItem key={item}>
            <div className="flex items-start gap-3 rounded-xl border bg-background p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm font-medium text-foreground">{item}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </>
  );

  if (embedded) {
    return <div className="min-w-0">{content}</div>;
  }

  return (
    <section className="py-16 md:py-20">
      <Container>{content}</Container>
    </section>
  );
}
