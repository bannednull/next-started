import { z } from 'zod';

export const subscriptionSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
});
