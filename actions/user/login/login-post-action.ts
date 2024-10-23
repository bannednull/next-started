'use server';

import { actionClient } from '@/actions/safe-action';
import { signinSchema } from './schema';
import { signIn } from '@/auth';

export const loginAction = actionClient
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
