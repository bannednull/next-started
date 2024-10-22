'use client';

import { login } from '@/actions/login-auth';
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
import { signinSchema } from '@/types/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function SignIn() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    const res = await login(data);
    if ('error' in res) {
      form.setError('root', { message: res.error });
      return;
    }
    redirect('/dashboard');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <section className="mx-auto my-5 w-full max-w-xs rounded-md border bg-muted/20 p-5">
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

            {form.formState.errors.root && (
              <p className="text-red-500">{form.formState.errors.root.message}</p>
            )}

            <Button type="submit">Sign in</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default SignIn;
