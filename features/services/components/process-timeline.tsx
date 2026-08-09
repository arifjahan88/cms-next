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
        title="Our Development Process"
        action={
          embedded
            ? undefined
            : { label: "Learn more", href: "/book-consultation" }
        }
        className={embedded ? "mb-5" : undefined}
      />
      {embedded ? (
        <div className="relative">
          <div
            className="absolute top-5 right-4 left-4 hidden h-px border-t border-dashed border-primary/30 lg:block"
            aria-hidden
          />
          <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7 lg:gap-2">
            {processSteps.map((step) => {
              const Icon = getIcon(step.icon);
              return (
                <li
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-sm">
                    <Icon className="size-4" />
                  </span>
                  <p className="mt-2.5 text-sm font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <StaggerChildren className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
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
      )}
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
