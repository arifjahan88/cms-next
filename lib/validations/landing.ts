import { z } from 'zod';
import { HOME_SECTION_IDS } from '@/db/schema';
import { getPageSectionIds, isValidPageSection } from '@/features/dashboard/data/page-configs';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import type { SectionId } from '@/features/dashboard/data/landing-cms';

export const homeSectionIdSchema = z.enum(HOME_SECTION_IDS);

export const sectionStatusSchema = z.enum(['published', 'draft', 'Published', 'Draft']);

const landingCtaSchema = z.object({
  label: z.string(),
  href: z.string(),
  newTab: z.boolean(),
});

const landingMediaSchema = z.object({
  name: z.string(),
  size: z.string(),
  label: z.string(),
});

const heroContentSchema = z.object({
  badge: z.string(),
  title: z.string(),
  highlight: z.string(),
  description: z.string(),
  primaryCta: landingCtaSchema,
  secondaryCta: landingCtaSchema,
  media: landingMediaSchema,
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      icon: z.string(),
    })
  ),
});

const trustedByContentSchema = z.object({
  title: z.string(),
  brands: z.array(
    z.object({
      name: z.string(),
      logo: z.string(),
    })
  ),
});

const servicesContentSchema = z.object({
  title: z.string(),
  action: landingCtaSchema,
  itemCtaLabel: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      href: z.string(),
    })
  ),
});

const industriesContentSchema = z.object({
  title: z.string(),
  action: landingCtaSchema,
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      href: z.string(),
    })
  ),
});

const whyChooseContentSchema = z.object({
  title: z.string(),
  action: landingCtaSchema,
  experienceBadge: z.string(),
  media: landingMediaSchema,
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
});

const caseStudiesContentSchema = z.object({
  title: z.string(),
  action: landingCtaSchema,
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      image: z.string(),
      href: z.string(),
      techStack: z.array(z.string()),
    })
  ),
});

const testimonialsContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      quote: z.string(),
      name: z.string(),
      role: z.string(),
      avatar: z.string(),
      rating: z.number(),
    })
  ),
});

const contactCtaContentSchema = z.object({
  headline: z.string(),
  description: z.string(),
  benefits: z.array(z.string()),
  formTitle: z.string(),
  submitLabel: z.string(),
  contactPanelTitle: z.string(),
});

export const homeContentSchemaBySectionId = {
  hero: heroContentSchema,
  trustedBy: trustedByContentSchema,
  services: servicesContentSchema,
  industries: industriesContentSchema,
  whyChoose: whyChooseContentSchema,
  caseStudies: caseStudiesContentSchema,
  testimonials: testimonialsContentSchema,
  contactCta: contactCtaContentSchema,
} as const;

export function parseHomeSectionContent(sectionId: SectionId, content: unknown) {
  return homeContentSchemaBySectionId[sectionId].parse(content);
}

export function parsePageSectionContent(
  pageSlug: PageSlug,
  sectionId: string,
  content: unknown
) {
  if (pageSlug === 'home') {
    return parseHomeSectionContent(sectionId as SectionId, content);
  }
  if (!isValidPageSection(pageSlug, sectionId)) {
    throw new Error(`Invalid section ${sectionId} for page ${pageSlug}`);
  }
  return z.record(z.string(), z.unknown()).parse(content);
}

export const updateLandingSectionSchema = z
  .object({
    page: z.string().optional(),
    title: z.string().trim().min(1).max(255).optional(),
    status: sectionStatusSchema.optional(),
    icon: z.string().trim().max(64).optional(),
    visible: z.boolean().optional(),
    content: z.unknown().optional(),
  })
  .refine((value) => Object.keys(value).filter((k) => k !== 'page').length > 0, {
    message: 'At least one field is required',
  });

export function createReorderSchema(pageSlug: PageSlug) {
  const ids = getPageSectionIds(pageSlug);
  return z.object({
    page: z.string().optional(),
    orderedSectionIds: z.array(z.string()).length(ids.length),
  });
}

export type UpdateLandingSectionValues = z.infer<typeof updateLandingSectionSchema>;

export const pageSlugSchema = z.enum([
  'home',
  'about',
  'services',
  'industries',
  'technologies',
  'careers',
  'portfolio',
  'blog',
  'case-studies',
  'contact',
  'book-consultation',
]);

export const updatePageSeoSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  description: z.string().trim().min(1).optional(),
  ogImage: z.string().trim().max(1024).nullable().optional(),
  noIndex: z.boolean().optional(),
});

export type UpdatePageSeoValues = z.infer<typeof updatePageSeoSchema>;

export const blogPostSchema = z.object({
  slug: z.string().trim().min(1).max(255),
  title: z.string().trim().min(1).max(255),
  excerpt: z.string().trim().min(1),
  body: z.string().default(''),
  category: z.string().trim().min(1).max(100),
  author: z.string().trim().max(255).default(''),
  image: z.string().trim().max(1024).default(''),
  readTime: z.string().trim().max(32).default('5 min'),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'Draft', 'Published']),
  seoTitle: z.string().trim().max(255).nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export const caseStudySchema = z.object({
  slug: z.string().trim().min(1).max(255),
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1),
  category: z.string().trim().min(1).max(100),
  image: z.string().trim().max(1024).default(''),
  challenge: z.string().default(''),
  solution: z.string().default(''),
  techStack: z.array(z.string()).default([]),
  metrics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .default([]),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'Draft', 'Published']),
  seoTitle: z.string().trim().max(255).nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export const jobOpeningSchema = z.object({
  slug: z.string().trim().min(1).max(255),
  title: z.string().trim().min(1).max(255),
  department: z.string().trim().min(1).max(100),
  type: z.string().trim().min(1).max(50),
  location: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1),
  applyHref: z.string().trim().max(1024).default('/careers#apply'),
  status: z.enum(['draft', 'published', 'Draft', 'Published']),
  sortOrder: z.number().int().optional(),
});

export const portfolioProjectSchema = z.object({
  slug: z.string().trim().min(1).max(255),
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1),
  category: z.string().trim().min(1).max(100),
  image: z.string().trim().max(1024).default(''),
  href: z.string().trim().max(1024).default('/case-studies'),
  projectDate: z.string().trim().max(32).default(''),
  status: z.enum(['draft', 'published', 'Draft', 'Published']),
  sortOrder: z.number().int().optional(),
});

export const inboxStatusSchema = z.object({
  status: z.enum(['new', 'read', 'archived', 'confirmed']),
});

export const consultationSubmitSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  company: z.string().min(2),
  phone: z.string().min(6),
  service: z.string().min(1),
  projectType: z.enum(['new', 'existing', 'unsure']),
  description: z.string().min(10),
  budget: z.string().optional(),
  referral: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  consent: z.boolean().refine((v) => v, 'You must agree to continue'),
  website: z.string().max(0).optional(),
});

export const contactSubmitSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().pipe(z.email()),
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2),
  message: z.string().trim().min(10),
  consent: z.boolean().refine((v) => v, 'You must agree to continue'),
  website: z.string().max(0).optional(),
});

function normalizeStatus(status: string) {
  return status.toLowerCase() === 'published' ? 'published' : 'draft';
}

export { normalizeStatus };
