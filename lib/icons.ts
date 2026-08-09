import { icons, Layers, type LucideIcon } from 'lucide-react';

/** Legacy aliases used across the marketing site */
const iconAliases: Record<string, LucideIcon> = {
  code: icons.Code,
  shield: icons.ShieldCheck,
  heart: icons.HeartPulse,
  heartOutline: icons.Heart,
  shopping: icons.ShoppingBag,
  graduation: icons.GraduationCap,
  building: icons.Building2,
  message: icons.MessageSquare,
  trending: icons.TrendingUp,
  mapPin: icons.MapPin,
  whatsapp: icons.MessageCircle,
  check: icons.CircleCheck,
};

export function pascalToKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

export function kebabToPascal(name: string): string {
  return name
    .replace(/^lucide:/i, '')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** All Lucide icon PascalCase names (sorted). */
export const LUCIDE_ICON_NAMES = Object.keys(icons).sort((a, b) => a.localeCompare(b));

export function getLucideIconComponent(name?: string): LucideIcon | undefined {
  if (!name) return undefined;
  const raw = name.replace(/^lucide:/i, '').trim();
  if (!raw) return undefined;

  if (raw in icons) {
    return icons[raw as keyof typeof icons];
  }

  const alias = iconAliases[raw];
  if (alias) return alias;

  const pascal = kebabToPascal(raw);
  if (pascal in icons) {
    return icons[pascal as keyof typeof icons];
  }

  return undefined;
}

export function getIcon(name?: string): LucideIcon {
  return getLucideIconComponent(name) ?? Layers;
}
