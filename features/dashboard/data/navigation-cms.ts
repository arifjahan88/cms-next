import { footerLinks, mainNav } from '@/features/layout/data/nav';

export type MenuItemStatus = 'Published' | 'Draft';

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  status: MenuItemStatus;
  openIn: 'same' | 'new';
  visible: boolean;
  cssClass?: string;
  rel?: string;
  description?: string;
  children?: MenuItem[];
};

export type NavMenu = {
  id: string;
  title: string;
  description: string;
  status: MenuItemStatus;
  updatedAt: string;
  items: MenuItem[];
};

let idCounter = 0;
function nid(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

const ICON_BY_LABEL: Record<string, string> = {
  Home: 'globe',
  Services: 'briefcase',
  Industries: 'building',
  Technologies: 'layers',
  Portfolio: 'eye',
  'Case Studies': 'eye',
  Blog: 'message',
  'About Us': 'users',
  Careers: 'briefcase',
  'Contact Us': 'mail',
  Contact: 'mail',
};

function toMenuItem(
  label: string,
  href: string,
  children?: { title: string; href: string; description?: string }[]
): MenuItem {
  return {
    id: nid('item'),
    label,
    href,
    icon: ICON_BY_LABEL[label] ?? 'layers',
    status: 'Published',
    openIn: 'same',
    visible: true,
    children: children?.map((c) => ({
      id: nid('child'),
      label: c.title,
      href: c.href,
      status: 'Published' as const,
      openIn: 'same' as const,
      visible: true,
      description: c.description,
    })),
  };
}

function buildMainItems(): MenuItem[] {
  const fromSite = mainNav.map((item) => toMenuItem(item.title, item.href, item.children));
  return [toMenuItem('Home', '/'), ...fromSite, toMenuItem('Contact Us', '/contact')];
}

function buildFooterItems(): MenuItem[] {
  return (Object.entries(footerLinks) as [string, { title: string; href: string }[]][]).map(
    ([column, links]) => ({
      id: nid('footer-col'),
      label: column.charAt(0).toUpperCase() + column.slice(1),
      href: '#',
      icon: 'layers',
      status: 'Published' as const,
      openIn: 'same' as const,
      visible: true,
      children: links.map((l) => ({
        id: nid('footer-link'),
        label: l.title,
        href: l.href,
        status: 'Published' as const,
        openIn: 'same' as const,
        visible: true,
      })),
    })
  );
}

export function createNavigationDocument(): NavMenu[] {
  idCounter = 0;
  const mainItems = buildMainItems();
  return [
    {
      id: 'main',
      title: 'Main Menu',
      description: 'Primary navigation menu',
      status: 'Published',
      updatedAt: '2 hours ago',
      items: structuredClone(mainItems),
    },
    {
      id: 'footer',
      title: 'Footer Menu',
      description: 'Footer navigation menu',
      status: 'Published',
      updatedAt: '1 day ago',
      items: buildFooterItems(),
    },
    {
      id: 'mobile',
      title: 'Mobile Menu',
      description: 'Mobile navigation menu',
      status: 'Published',
      updatedAt: '3 hours ago',
      items: structuredClone(mainItems),
    },
  ];
}

export function createEmptyMenuItem(label = 'New Item'): MenuItem {
  return {
    id: nid('item'),
    label,
    href: '/',
    icon: 'layers',
    status: 'Draft',
    openIn: 'same',
    visible: true,
    children: [],
  };
}

export function findMenuItem(items: MenuItem[], id: string): MenuItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuItem(item.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

export function updateMenuItemInTree(
  items: MenuItem[],
  id: string,
  patch: Partial<MenuItem>
): MenuItem[] {
  return items.map((item) => {
    if (item.id === id) {
      return { ...item, ...patch, id: item.id };
    }
    if (item.children?.length) {
      return {
        ...item,
        children: updateMenuItemInTree(item.children, id, patch),
      };
    }
    return item;
  });
}

export function removeMenuItemFromTree(items: MenuItem[], id: string): MenuItem[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) =>
      item.children ? { ...item, children: removeMenuItemFromTree(item.children, id) } : item
    );
}

export function setChildrenForItem(
  items: MenuItem[],
  parentId: string,
  children: MenuItem[]
): MenuItem[] {
  return items.map((item) => {
    if (item.id === parentId) {
      return { ...item, children };
    }
    if (item.children?.length) {
      return {
        ...item,
        children: setChildrenForItem(item.children, parentId, children),
      };
    }
    return item;
  });
}
