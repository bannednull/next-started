'use client';

import { subscriptionSchema } from '@/actions/user/subscription/schema';
import { subscriptionAction } from '@/actions/user/subscription/subscription-post-action';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function FormSubscription() {
  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: '',
    },
  });

  const { execute } = useAction(subscriptionAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: 'Error' });
        return;
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof subscriptionSchema>) => execute(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}

        <Button className="w-full" size="sm" type="submit">
          Subscribe
        </Button>
      </form>
    </Form>
  );
}

export default FormSubscription;
