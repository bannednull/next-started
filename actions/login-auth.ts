'use server';

import { signIn } from '@/auth';
import { signinSchema } from '@/types/validate';
import { z } from 'zod';

export async function login(data: z.infer<typeof signinSchema>) {
  try {
    await signIn('credentials', {
      redirect: false,
      ...data,
    });
    return { success: true };
  } catch {
    return { error: 'Invalid credentials' };
  }
}
