import type { Metadata } from "next";
import { CaseStudiesPage } from "@/features/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real challenges and proven results from Zaimah Technologies client engagements across industries.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
