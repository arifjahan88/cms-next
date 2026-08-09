import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { coreServices } from "@/features/home/data/home";
import { getIcon } from "@/lib/icons";

export function CoreServices() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Our Core Services"
          description="End-to-end software engineering services to design, build, and scale your digital products."
          action={{ label: "Explore all services", href: "/services" }}
        />
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <StaggerItem key={service.id}>
                <Card className="h-full border shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="flex-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Learn More <ArrowRight className="size-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
