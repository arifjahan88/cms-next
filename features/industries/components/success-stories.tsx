import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { successStories } from "@/features/industries/data/industries";
import { cn } from "@/lib/utils";

const badgeColors: Record<string, string> = {
  Healthcare: "bg-sky-500 text-white",
  "Real Estate": "bg-brand-navy text-white",
  FinTech: "bg-emerald-500 text-white",
  Retail: "bg-orange-500 text-white",
  Education: "bg-violet-500 text-white",
};

export function IndustriesSuccessStories() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Industry Success Stories"
          action={{ label: "View all case studies", href: "/case-studies" }}
          accent
        />
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {successStories.map((item) => (
            <StaggerItem key={item.id} hoverLift={false}>
              <Card className="h-full overflow-hidden rounded-xl border border-border/80 bg-background p-0 shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-16/10 overflow-hidden rounded-t-xl bg-muted">
                  <ImagePlaceholder
                    label="[Case Study Image]"
                    className="absolute inset-0 rounded-none border-0"
                  />
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm",
                      badgeColors[item.category] ?? "bg-primary text-white"
                    )}
                  >
                    {item.category}
                  </span>
                </div>
                <CardContent className="flex h-full flex-col gap-2.5 p-4">
                  <h3 className="text-sm font-bold leading-snug text-foreground md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-primary hover:underline"
                  >
                    View Case Study
                    <ArrowRight className="size-3.5" />
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
