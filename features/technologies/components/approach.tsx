import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import {
  approachBenefits,
  approachIntro,
} from "@/features/technologies/data/technologies";
import { getIcon } from "@/lib/icons";

export function TechnologiesApproach() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {approachIntro.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {approachIntro.description}
            </p>
            <Button
              size="lg"
              className="mt-6 h-11 px-5"
              render={<Link href={approachIntro.cta.href} />}
            >
              {approachIntro.cta.label}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {approachBenefits.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <StaggerItem key={item.title} hoverLift={false}>
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-border/80 bg-background p-5 shadow-sm">
                    <span className="flex size-10 items-center justify-center text-primary">
                      <Icon className="size-5 stroke-[1.5]" />
                    </span>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
