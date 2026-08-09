import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { industriesWeServe } from "@/features/industries/data/industries";
import { getIcon } from "@/lib/icons";

export function IndustriesGrid() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Industries We Serve"
          description="Vertical solutions backed by real delivery experience across regulated and high-growth markets."
        />
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {industriesWeServe.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.id}>
                <Card
                  id={item.href.split("#")[1]}
                  className="h-full scroll-mt-28 border shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="flex-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more <ArrowRight className="size-3.5" />
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
