import { useResetPassword } from '~/modules/authentication/hooks/useResetPassword';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
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

export default function ResetPasswordForm() {
  const { onSubmit, form, isLoading, isSuccess, token } = useResetPassword();

  if (isSuccess) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-6 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold">Password Reset!</h1>
        <p className="text-balance text-muted-foreground">
          Your password has been successfully updated. You can now use your new
          password to log in.
        </p>
        <Button asChild className="w-full">
          <Link to="/login">Back to Login</Link>
        </Button>
      </div>
    );
  }

  // If there's no token in the URL, show an error message
  if (!token) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-destructive">Invalid Link</h1>
        <p className="text-balance text-muted-foreground">
          The password reset link is missing or invalid. Please request a new
          one.
        </p>
        <Button asChild className="w-full">
          <Link to="/forgot-password">Request a New Link</Link>
        </Button>
      </div>
    );
  }

  // Otherwise, render the form
  return (
    <Form {...form}>
      <form
        className="mx-auto flex max-w-sm flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Set a New Password</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Please create a new, secure password for your account.
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="password"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message && (
            <span className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </span>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Reset Password'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
