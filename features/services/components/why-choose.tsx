import {
  CheckCircle2,
  Clock,
  FileLock2,
  Handshake,
  Lock,
  RefreshCw,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { whyChooseServices } from "@/features/services/data/services";
import { cn } from "@/lib/utils";

const whyChooseIcons: LucideIcon[] = [
  Users,
  RefreshCw,
  FileLock2,
  ShieldCheck,
  Clock,
  Handshake,
  Lock,
  CheckCircle2,
];

export function ServicesWhyChoose({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Why Choose Zaimah?"
        size={embedded ? "sm" : "default"}
        className={embedded ? "mb-3" : undefined}
      />
      <StaggerChildren
        className={
          embedded
            ? "grid gap-2.5"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {whyChooseServices.map((item, index) => {
          const Icon = whyChooseIcons[index % whyChooseIcons.length];
          return (
            <StaggerItem key={item}>
              <div
                className={cn(
                  "flex items-center",
                  embedded ? "gap-2" : "gap-3"
                )}
              >
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center text-primary",
                    embedded ? "size-6" : "size-8"
                  )}
                >
                  <Icon
                    className={cn(
                      "stroke-[1.5]",
                      embedded ? "size-3.5" : "size-5"
                    )}
                  />
                </span>
                <p
                  className={cn(
                    "font-medium leading-snug text-foreground",
                    embedded ? "text-xs" : "text-sm"
                  )}
                >
                  {item}
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
