import { z } from 'zod';
import { LANDING_SECTION_IDS } from '@/db/schema';
import type { SectionId } from '@/features/dashboard/data/landing-cms';

export const landingSectionIdSchema = z.enum(LANDING_SECTION_IDS);

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

export const landingContentSchemaBySectionId = {
  hero: heroContentSchema,
  trustedBy: trustedByContentSchema,
  services: servicesContentSchema,
  industries: industriesContentSchema,
  whyChoose: whyChooseContentSchema,
  caseStudies: caseStudiesContentSchema,
  testimonials: testimonialsContentSchema,
  contactCta: contactCtaContentSchema,
} as const;

export function parseLandingSectionContent(sectionId: SectionId, content: unknown) {
  return landingContentSchemaBySectionId[sectionId].parse(content);
}

export const updateLandingSectionSchema = z
  .object({
    title: z.string().trim().min(1).max(255).optional(),
    status: sectionStatusSchema.optional(),
    icon: z.string().trim().max(64).optional(),
    visible: z.boolean().optional(),
    content: z.unknown().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

export const reorderLandingSectionsSchema = z.object({
  orderedSectionIds: z.array(landingSectionIdSchema).length(LANDING_SECTION_IDS.length),
});

export type UpdateLandingSectionValues = z.infer<typeof updateLandingSectionSchema>;
export type ReorderLandingSectionsValues = z.infer<typeof reorderLandingSectionsSchema>;
