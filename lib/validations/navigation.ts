import { z } from 'zod';
import { NAV_MENU_SLUGS } from '@/db/schema';

export const navMenuSlugSchema = z.enum(NAV_MENU_SLUGS);

export const menuStatusSchema = z.enum(['published', 'draft', 'Published', 'Draft']);

export const openInSchema = z.enum(['same', 'new']);

export const updateMenuSchema = z
  .object({
    title: z.string().trim().min(1).max(255).optional(),
    description: z.string().max(2000).optional(),
    status: menuStatusSchema.optional(),
  })
  .refine((v) => Object.keys(v).length > 0, {
    message: 'At least one field is required',
  });

export const createMenuItemSchema = z.object({
  label: z.string().trim().min(1).max(255).optional().default('New Menu Item'),
  href: z.string().trim().min(1).max(1024).optional().default('/'),
  icon: z.string().trim().max(64).optional().nullable(),
  status: menuStatusSchema.optional(),
  openIn: openInSchema.optional(),
  visible: z.boolean().optional(),
  cssClass: z.string().trim().max(255).optional().nullable(),
  rel: z.string().trim().max(255).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  parentId: z.string().uuid().optional().nullable(),
});

export const updateMenuItemSchema = z
  .object({
    label: z.string().trim().min(1).max(255).optional(),
    href: z.string().trim().min(1).max(1024).optional(),
    icon: z.string().trim().max(64).optional().nullable(),
    status: menuStatusSchema.optional(),
    openIn: openInSchema.optional(),
    visible: z.boolean().optional(),
    cssClass: z.string().trim().max(255).optional().nullable(),
    rel: z.string().trim().max(255).optional().nullable(),
    description: z.string().max(2000).optional().nullable(),
  })
  .refine((v) => Object.keys(v).length > 0, {
    message: 'At least one field is required',
  });

export const reorderMenuItemsSchema = z.object({
  parentId: z.string().uuid().nullable(),
  orderedIds: z.array(z.string().uuid()).min(1),
});

export type UpdateMenuValues = z.infer<typeof updateMenuSchema>;
export type CreateMenuItemValues = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemValues = z.infer<typeof updateMenuItemSchema>;
export type ReorderMenuItemsValues = z.infer<typeof reorderMenuItemsSchema>;
