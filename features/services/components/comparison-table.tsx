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

export function ServicesComparison({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Services Comparison"
        description="Find the right service fit by use case, timeline, and engagement style."
        className={embedded ? "mb-5" : undefined}
      />
      <FadeIn>
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-28 px-2.5 text-xs sm:w-32 sm:px-3 sm:text-sm">
                  Service
                </TableHead>
                <TableHead className="px-2.5 text-xs sm:px-3 sm:text-sm">
                  Best For
                </TableHead>
                <TableHead className="px-2.5 text-xs sm:px-3 sm:text-sm">
                  Timeline
                </TableHead>
                <TableHead className="px-2.5 text-xs sm:px-3 sm:text-sm">
                  Engagement
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row.service}>
                  <TableCell className="px-2.5 text-xs font-semibold whitespace-normal sm:px-3 sm:text-sm">
                    {row.service}
                  </TableCell>
                  <TableCell className="px-2.5 text-xs whitespace-normal text-muted-foreground sm:px-3 sm:text-sm">
                    {row.bestFor}
                  </TableCell>
                  <TableCell className="px-2.5 text-xs whitespace-normal sm:px-3 sm:text-sm">
                    {row.timeline}
                  </TableCell>
                  <TableCell className="px-2.5 text-xs whitespace-normal sm:px-3 sm:text-sm">
                    {row.engagement}
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
