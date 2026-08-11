import { getPublicMenu } from '@/db/queries/navigation';
import type { MenuItem } from '@/features/dashboard/data/navigation-cms';
import { footerLinks, mainNav } from '@/features/layout/data/nav';
import type { NavItem } from '@/types';

function menuItemToNavItem(item: MenuItem): NavItem {
  return {
    title: item.label,
    href: item.href,
    children: item.children?.map((child) => ({
      title: child.label,
      href: child.href,
      description: child.description,
    })),
  };
}

function fallbackMainNav(): NavItem[] {
  return mainNav;
}

function fallbackMobileNav(): NavItem[] {
  return [{ title: 'Home', href: '/' }, ...mainNav, { title: 'Contact Us', href: '/contact' }];
}

export type FooterColumn = {
  title: string;
  links: { title: string; href: string }[];
};

function fallbackFooterColumns(): FooterColumn[] {
  return (Object.entries(footerLinks) as [string, { title: string; href: string }[]][]).map(
    ([key, links]) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      links,
    })
  );
}

export async function getMainNavItems(): Promise<NavItem[]> {
  try {
    const menu = await getPublicMenu('main');
    if (!menu?.items.length) return fallbackMainNav();
    // Public main nav historically excludes Home/Contact (CTAs) — keep CMS items as-is
    return menu.items.map(menuItemToNavItem);
  } catch {
    return fallbackMainNav();
  }
}

export async function getMobileNavItems(): Promise<NavItem[]> {
  try {
    const menu = await getPublicMenu('mobile');
    if (!menu?.items.length) return fallbackMobileNav();
    return menu.items.map(menuItemToNavItem);
  } catch {
    return fallbackMobileNav();
  }
}

export async function getFooterColumns(): Promise<FooterColumn[]> {
  try {
    const menu = await getPublicMenu('footer');
    if (!menu?.items.length) return fallbackFooterColumns();
    return menu.items.map((item) => ({
      title: item.label,
      links:
        item.children && item.children.length > 0
          ? item.children.map((link) => ({
              title: link.label,
              href: link.href,
            }))
          : [{ title: item.label, href: item.href }],
    }));
  } catch {
    return fallbackFooterColumns();
  }
}
