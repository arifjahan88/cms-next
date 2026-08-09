import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeftRight,
  Briefcase,
  Building2,
  Cpu,
  FolderKanban,
  FormInput,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  Menu,
  Newspaper,
  Plug,
  Search,
  Settings,
  Users,
  UserRound,
  MessageSquareQuote,
  Layers,
} from 'lucide-react';

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

function soon(section: string) {
  return `/dashboard/coming-soon?section=${encodeURIComponent(section)}`;
}

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
    label: 'Manage Content',
    items: [
      {
        title: 'Landing Page',
        href: '/dashboard/landing-page',
        icon: LayoutTemplate,
        chevron: true,
      },
      {
        title: 'Navigation',
        href: '/dashboard/navigation',
        icon: Menu,
        chevron: true,
      },
      {
        title: 'Sections',
        href: soon('Sections'),
        icon: Layers,
      },
      {
        title: 'Media Library',
        href: soon('Media Library'),
        icon: Image,
      },
      {
        title: 'Forms',
        href: soon('Forms'),
        icon: FormInput,
      },
      {
        title: 'SEO Settings',
        href: soon('SEO Settings'),
        icon: Search,
      },
    ],
  },
  {
    label: 'Collections',
    items: [
      {
        title: 'Services',
        href: soon('Services'),
        icon: Briefcase,
      },
      {
        title: 'Industries',
        href: soon('Industries'),
        icon: Building2,
      },
      {
        title: 'Technologies',
        href: soon('Technologies'),
        icon: Cpu,
      },
      {
        title: 'Case Studies',
        href: soon('Case Studies'),
        icon: FolderKanban,
      },
      {
        title: 'Blogs',
        href: soon('Blogs'),
        icon: Newspaper,
      },
      {
        title: 'Careers',
        href: soon('Careers'),
        icon: UserRound,
      },
      {
        title: 'Team Members',
        href: soon('Team Members'),
        icon: Users,
      },
      {
        title: 'Testimonials',
        href: soon('Testimonials'),
        icon: MessageSquareQuote,
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        title: 'Site Settings',
        href: soon('Site Settings'),
        icon: Settings,
      },
      {
        title: 'API & Integrations',
        href: soon('API'),
        icon: Plug,
      },
      {
        title: 'Redirects',
        href: soon('Redirects'),
        icon: ArrowLeftRight,
      },
    ],
  },
];

export function getDashboardPageTitle(pathname: string): string {
  if (pathname.startsWith('/dashboard/landing-page')) {
    return 'Landing Page';
  }
  if (pathname.startsWith('/dashboard/navigation')) {
    return 'Navigation';
  }
  if (pathname.startsWith('/dashboard/coming-soon')) {
    return 'Coming Soon';
  }
  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    return 'Dashboard';
  }
  return 'Dashboard';
}
