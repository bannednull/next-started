'use client';

import { loginAction } from '@/actions/user/login/login-post-action';
import { signinSchema } from '@/actions/user/login/schema';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function FormSignIn() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const router = useRouter();

  const { execute } = useAction(loginAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
      router.push('/dashboard');
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => execute(data);

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

        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}

        <Link className="text-sm text-blue-500 hover:text-blue-700" href="/forgot">
          Forgot your password?
        </Link>

        <Button className="w-full" size="sm" type="submit">
          Sign in
        </Button>

        <p className="text-sm text-muted-foreground">
          No account?{' '}
          <Link className="text-blue-500 hover:text-blue-700" href="/signup">
            Sign Up Now
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default FormSignIn;
