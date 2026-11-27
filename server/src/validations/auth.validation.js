import { z } from 'zod';

// Define the validation rules for registration
export const registerSchema = z.object({
  // Validate the user's full name
  name: z.string().trim().min(2).max(100),

  // Validate and normalize the email address
  email: z.string().trim().toLowerCase().email(),

  // Validate password length and bcrypt's byte limit
  password: z
    .string()
    .min(15, 'Password must be at least 15 characters')
    .refine((password) => Buffer.byteLength(password, 'utf8') <= 72, {
      message: 'Password must not exceed 72 bytes'
    }),

  // Validate the organization name
  companyName: z.string().trim().min(2).max(100)
});
