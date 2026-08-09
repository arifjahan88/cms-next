import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerChildren, StaggerItem } from "@/components/shared/motion/stagger-children";
import { successStories } from "@/features/industries/data/industries";

export function IndustriesSuccessStories() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Success Stories"
          description="Outcomes our industry clients achieved with Zaimah as their engineering partner."
          action={{ label: "All case studies", href: "/case-studies" }}
        />
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {successStories.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="h-full overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-16/10 bg-muted">
                  <ImagePlaceholder
                    label="[Case Study Image]"
                    className="absolute inset-0 rounded-xl"
                  />
                  <Badge className="absolute left-3 top-3">{item.category}</Badge>
                </div>
                <CardContent className="flex flex-col gap-3 p-5">
                  <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.metrics ? (
                    <div className="grid grid-cols-2 gap-3 border-t pt-3">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="text-lg font-bold text-primary">{metric.value}</p>
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Read story <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
