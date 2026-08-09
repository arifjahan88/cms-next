import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/features/dashboard/components/admin-shell";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Zaimah Technologies admin panel",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-surface" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
