import type { Metadata } from "next";
import { CareersPage } from "@/features/careers";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${SITE.name}. Explore open roles, culture, and benefits across our global teams.`,
};

export default function Page() {
  return <CareersPage />;
}
