export const authKeys = {
  all: ['auth'] as const,
  me: ['auth', 'me'] as const,
};

export const navigationKeys = {
  all: ['navigation'] as const,
  admin: ['navigation', 'admin'] as const,
  menus: () => ['navigation', 'admin', 'menus'] as const,
  menu: (slug: string) => ['navigation', 'admin', 'menu', slug] as const,
};

export const landingKeys = {
  all: ['landing'] as const,
  admin: ['landing', 'admin'] as const,
  document: () => ['landing', 'admin', 'document'] as const,
};
