import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { comparisonRows } from "@/features/services/data/services";

export function ServicesComparison({ embedded = false }: { embedded?: boolean }) {
  const content = (
    <>
      <SectionHeader
        title="Engagement Models Compared"
        description="Choose the delivery model that matches your scope, budget, and product maturity."
        className={embedded ? "mb-6" : undefined}
      />
      <FadeIn>
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-30 px-3 text-xs sm:w-40 sm:px-4 sm:text-sm">
                  Feature
                </TableHead>
                <TableHead className="px-3 text-xs sm:px-4 sm:text-sm">Fixed Price</TableHead>
                <TableHead className="px-3 text-xs sm:px-4 sm:text-sm">Time & Material</TableHead>
                <TableHead className="px-3 text-xs sm:px-4 sm:text-sm">Dedicated Team</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="px-3 text-xs font-medium whitespace-normal sm:px-4 sm:text-sm">
                    {row.feature}
                  </TableCell>
                  <TableCell className="px-3 text-xs whitespace-normal sm:px-4 sm:text-sm">
                    <span className="inline-flex items-start gap-1.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {row.fixed}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 text-xs whitespace-normal sm:px-4 sm:text-sm">
                    <span className="inline-flex items-start gap-1.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {row.timeMaterial}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 text-xs whitespace-normal sm:px-4 sm:text-sm">
                    <span className="inline-flex items-start gap-1.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {row.dedicated}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </>
  );

  if (embedded) {
    return <div className="min-w-0">{content}</div>;
  }

  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>{content}</Container>
    </section>
  );
}
