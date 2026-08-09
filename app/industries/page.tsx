import type { Metadata } from "next";
import { IndustriesPage } from "@/features/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industry-focused software solutions for healthcare, fintech, real estate, e-commerce, and more.",
};

export default function Page() {
  return <IndustriesPage />;
}
