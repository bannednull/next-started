import { z } from 'zod';

export const signinSchema = z.object({
  username: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z
  .object({
    username: z.string().email().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    repeatPassword: z.string().min(1, 'Repeat password is required'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });
