import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { servicesIndustries } from "@/features/services/data/services";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ServicesIndustriesMini({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Industries We Serve"
        action={{ label: "View all industries", href: "/industries" }}
        size={embedded ? "sm" : "default"}
        className={embedded ? "mb-3" : undefined}
      />
      <StaggerChildren
        className={
          embedded
            ? "grid grid-cols-2 gap-2"
            : "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {servicesIndustries.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <StaggerItem key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center text-center shadow-sm transition hover:border-primary/40 hover:shadow-md",
                  embedded
                    ? "gap-1.5 rounded-lg border border-border/80 bg-background px-1.5 py-2.5"
                    : "gap-2 rounded-xl border border-border/80 bg-background px-2 py-3.5"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center text-primary",
                    embedded ? "size-7" : "size-9"
                  )}
                >
                  <Icon
                    className={cn(
                      "stroke-[1.5]",
                      embedded ? "size-4" : "size-5"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "font-semibold leading-tight text-foreground",
                    embedded ? "text-[10px]" : "text-xs sm:text-sm"
                  )}
                >
                  {item.title}
                </span>
              </Link>
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
