'use server';

import { signIn } from '@/auth';
import { forgotPasswordSchema, signinSchema, signupSchema } from '@/types/validate';
import { hash } from 'bcryptjs';
import { prisma } from '@/libs/prisma';
import { actionClient } from '../safe-action';
import { Prisma } from '@prisma/client';

export const login = actionClient
  .metadata({ name: 'login' })
  .schema(signinSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      await signIn('credentials', {
        redirect: false,
        ...{ username, password },
      });
      return { success: true };
    } catch {
      return { error: 'Invalid credentials' };
    }
  });

export const register = actionClient
  .metadata({ name: 'register' })
  .schema(signupSchema)
  .action(async ({ parsedInput: { username, password, repeatPassword } }) => {
    if (password !== repeatPassword) {
      return { error: 'Passwords do not match' };
    }

    const passwordHash = await hash(password, 10);

    try {
      await prisma.user.create({
        data: {
          email: username,
          password: passwordHash,
        },
      });
      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return { error: 'This email is already registered' };
      }
      return { error: 'An error occurred during registration' };
    }
  });

export const forgotPassword = actionClient
  .metadata({ name: 'forgot_password' })
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    //TODO: send email
    return user;
  });
