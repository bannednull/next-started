import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    repeatPassword: z.string().min(1, 'Repeat password is required'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });
