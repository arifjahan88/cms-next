import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.email('Enter a valid email'),
});

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.email('Enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Please provide more details'),
  consent: z.boolean().refine((v) => v, 'You must agree to continue'),
});

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.email('Enter a valid email'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().min(6, 'Phone is required'),
  service: z.string().min(1, 'Select a service'),
  projectType: z.enum(['new', 'existing', 'unsure']),
  description: z.string().min(10, 'Please describe your project'),
  budget: z.string().optional(),
  referral: z.string().optional(),
  consent: z.boolean().refine((v) => v, 'You must agree to continue'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ConsultationFormValues = z.infer<typeof consultationSchema>;
