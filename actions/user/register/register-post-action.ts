'use server';

import { actionClient } from '@/actions/safe-action';
import { signupSchema } from './schema';
import { hash } from 'bcryptjs';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

export const registerAction = actionClient
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
