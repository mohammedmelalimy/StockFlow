import { z } from 'zod';

// Registration form validation rules
export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),

  companyName: z.string().trim().min(2, 'Company name must be at least 2 characters').max(100),

  email: z.string().trim().toLowerCase().email('Invalid email address'),

  password: z
    .string()
    .min(15, 'Password must be at least 15 characters')
    .refine((password) => new TextEncoder().encode(password).length <= 72, {
      message: 'Password must not exceed 72 bytes'
    })
});

// Infer the registration form type from the schema
export type RegisterFormData = z.infer<typeof registerSchema>;
