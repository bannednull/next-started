'use server';

import { actionClient } from '@/actions/safe-action';
import { subscriptionSchema } from './schema';

export const subscriptionAction = actionClient
  .metadata({ name: 'subscription' })
  .schema(subscriptionSchema)
  .action(async ({ parsedInput: { email } }) => {
    console.log(email);
  });
