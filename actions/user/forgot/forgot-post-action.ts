import { actionClient } from '@/actions/safe-action';
import { forgotPasswordSchema } from './schema';
import { prisma } from '@/libs/prisma';

export const forgotAction = actionClient
  .metadata({ name: 'forgot_password' })
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    //TODO: send email
    return user;
  });
