import { z } from 'zod';
import { UserRole } from '@/db/schema';

const roleSchema = z.union([
  z.literal(UserRole.Admin),
  z.literal(UserRole.User),
]);

export const userCreateSchema = z.object({
  email: z.string().trim().pipe(z.email('Enter a valid email')),
  name: z.string().trim().min(2, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: roleSchema,
});

export const userUpdateSchema = z.object({
  email: z.string().trim().pipe(z.email('Enter a valid email')).optional(),
  name: z.string().trim().min(2, 'Name is required').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .optional()
    .or(z.literal('')),
  role: roleSchema.optional(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
