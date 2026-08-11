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
  document: (page = 'home') => ['landing', 'admin', 'document', page] as const,
};

export const seoKeys = {
  all: ['seo'] as const,
  settings: () => ['seo', 'settings'] as const,
};

export const blogKeys = {
  all: ['blog'] as const,
  admin: () => ['blog', 'admin'] as const,
};

export const caseStudyKeys = {
  all: ['case-studies'] as const,
  admin: () => ['case-studies', 'admin'] as const,
};

export const jobKeys = {
  all: ['jobs'] as const,
  admin: () => ['jobs', 'admin'] as const,
};

export const portfolioKeys = {
  all: ['portfolio'] as const,
  admin: () => ['portfolio', 'admin'] as const,
};

export const contactMessageKeys = {
  all: ['contact-messages'] as const,
  admin: () => ['contact-messages', 'admin'] as const,
};

export const consultationKeys = {
  all: ['consultations'] as const,
  admin: () => ['consultations', 'admin'] as const,
};

export const userKeys = {
  all: ['users'] as const,
  admin: () => ['users', 'admin'] as const,
  detail: (id: string) => ['users', 'admin', id] as const,
};
