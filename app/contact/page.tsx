import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name}. Call, email, or send a message—we respond within one business day.`,
};

export default function Page() {
  return <ContactPage />;
}
