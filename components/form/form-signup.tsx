'use client';

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
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { registerAction } from '@/actions/user/register/register-post-action';
import { signupSchema } from '@/actions/user/register/schema';

function FormSignUp() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
  });

  const { execute } = useAction(registerAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => execute(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="****" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="****" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}

        <Button className="w-full" size="sm" type="submit">
          Sign Up
        </Button>

        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link className="text-blue-500 hover:text-blue-700" href="/signin">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default FormSignUp;
