import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
});
