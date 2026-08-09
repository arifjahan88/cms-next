import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  FileText,
  FolderKanban,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  Settings,
  Users,
  UserRound,
  Plug,
} from "lucide-react";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  chevron?: boolean;
};

export type DashboardNavGroup = {
  label?: string;
  items: DashboardNavItem[];
};

export const dashboardNav: DashboardNavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Users",
        href: "/dashboard/coming-soon?section=Users",
        icon: Users,
        chevron: true,
      },
      {
        title: "Projects",
        href: "/dashboard/coming-soon?section=Projects",
        icon: FolderKanban,
        chevron: true,
      },
      {
        title: "Services",
        href: "/dashboard/coming-soon?section=Services",
        icon: Briefcase,
        chevron: true,
      },
      {
        title: "Leads",
        href: "/dashboard/coming-soon?section=Leads",
        icon: UserRound,
        chevron: true,
      },
      {
        title: "Clients",
        href: "/dashboard/coming-soon?section=Clients",
        icon: Building2,
        chevron: true,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        title: "Landing Page",
        href: "/dashboard/landing-page",
        icon: LayoutTemplate,
        chevron: true,
      },
      {
        title: "Blog",
        href: "/dashboard/coming-soon?section=Blog",
        icon: FileText,
        chevron: true,
      },
      {
        title: "Media Library",
        href: "/dashboard/coming-soon?section=Media%20Library",
        icon: Image,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Site Settings",
        href: "/dashboard/coming-soon?section=Site%20Settings",
        icon: Settings,
      },
      {
        title: "API & Integrations",
        href: "/dashboard/coming-soon?section=API",
        icon: Plug,
      },
    ],
  },
];

export function getDashboardPageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/landing-page")) {
    return "Landing Page";
  }
  if (pathname.startsWith("/dashboard/coming-soon")) {
    return "Coming Soon";
  }
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return "Dashboard";
  }
  return "Dashboard";
}
