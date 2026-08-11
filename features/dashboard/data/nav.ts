import {
  Briefcase,
  FileText,
  FolderKanban,
  Globe,
  Inbox,
  LayoutTemplate,
  Menu,
  Search,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';

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
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Page Content',
    items: [
      {
        title: 'Pages',
        href: '/dashboard/pages',
        icon: LayoutTemplate,
      },
      {
        title: 'Navigation',
        href: '/dashboard/navigation',
        icon: Menu,
      },
      {
        title: 'SEO Settings',
        href: '/dashboard/seo-settings',
        icon: Search,
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        title: 'Blog',
        href: '/dashboard/blog',
        icon: FileText,
      },
      {
        title: 'Case Studies',
        href: '/dashboard/case-studies',
        icon: Briefcase,
      },
      {
        title: 'Job Openings',
        href: '/dashboard/jobs',
        icon: Users,
      },
      {
        title: 'Portfolio',
        href: '/dashboard/portfolio',
        icon: FolderKanban,
      },
    ],
  },
  {
    label: 'Inbox',
    items: [
      {
        title: 'Contact Messages',
        href: '/dashboard/contact-messages',
        icon: Inbox,
      },
      {
        title: 'Consultation Bookings',
        href: '/dashboard/consultations',
        icon: Globe,
      },
    ],
  },
];

export function getDashboardPageTitle(pathname: string): string {
  if (pathname.startsWith('/dashboard/pages')) return 'Pages';
  if (pathname.startsWith('/dashboard/landing-page')) return 'Landing Page';
  if (pathname.startsWith('/dashboard/navigation')) return 'Navigation';
  if (pathname.startsWith('/dashboard/seo-settings')) return 'SEO Settings';
  if (pathname.startsWith('/dashboard/blog')) return 'Blog';
  if (pathname.startsWith('/dashboard/case-studies')) return 'Case Studies';
  if (pathname.startsWith('/dashboard/jobs')) return 'Job Openings';
  if (pathname.startsWith('/dashboard/portfolio')) return 'Portfolio';
  if (pathname.startsWith('/dashboard/contact-messages')) return 'Contact Messages';
  if (pathname.startsWith('/dashboard/consultations')) return 'Consultation Bookings';
  if (pathname.startsWith('/dashboard/coming-soon')) return 'Coming Soon';
  if (pathname === '/dashboard' || pathname === '/dashboard/') return 'Dashboard';
  return 'Dashboard';
}
