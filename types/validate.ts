import { z } from 'zod';

export const signinSchema = z.object({
  username: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});
