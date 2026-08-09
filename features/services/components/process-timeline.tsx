import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { processSteps } from "@/features/services/data/services";
import { getIcon } from "@/lib/icons";

export function ServicesProcess({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Our Delivery Process"
        description="A proven path from discovery to ongoing support—transparent at every milestone."
        className={embedded ? "mb-6" : undefined}
      />
      <StaggerChildren
        className={
          embedded
            ? "grid gap-3 sm:grid-cols-2"
            : "relative grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7"
        }
      >
        {processSteps.map((step) => {
          const Icon = getIcon(step.icon);
          return (
            <StaggerItem key={step.title}>
              <div className="relative flex h-full flex-col gap-2 rounded-xl border bg-background p-4 shadow-sm">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-sm">
                  <Icon className="size-4" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Step {step.step}
                </p>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          );
        })}
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
