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
import { changePasswordSchema } from '@/types/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function ResetPassword() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof changePasswordSchema>) => {
    console.log(data);
  };

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold">Reset password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm space-y-2">
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
                <FormLabel>Repeat password</FormLabel>
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
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPassword;
