'use server';

import { signIn } from '@/auth';
import { signinSchema, signupSchema } from '@/types/validate';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/libs/prisma';

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

export async function register(data: z.infer<typeof signupSchema>) {
  try {
    const password = await hash(data.password, 10);
    await prisma.user.create({
      data: {
        email: data.username,
        password,
      },
    });
    return { success: true };
  } catch {
    return { error: 'Registration failed' };
  }
}
