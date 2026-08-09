import type { Metadata } from "next";
import { AdminLogin } from "@/features/auth/components/admin-login";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the Zaimah Technologies admin panel.",
};

export default function LoginPage() {
  return <AdminLogin />;
}
