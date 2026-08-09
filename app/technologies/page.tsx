import type { Metadata } from "next";
import { TechnologiesPage } from "@/features/technologies";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "Frontend, backend, mobile, cloud, AI, and DevOps technologies used by Zaimah Technologies.",
};

export default function Page() {
  return <TechnologiesPage />;
}
