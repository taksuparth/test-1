import { useForgotPassword } from '~/modules/authentication/hooks/useForgotPassword';
import { authPageLoader } from '~/utils/authCheckLoader';
import { Loader2, MailCheck } from 'lucide-react';
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

export { authPageLoader as loader };

export default function ForgotPasswordForm() {
  const { onSubmit, form, isLoading, emailSent } = useForgotPassword();

  if (emailSent) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-6 text-center">
        <MailCheck className="h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold">Check your inbox</h1>
        <p className="text-balance text-muted-foreground">
          We've sent a password reset link to{' '}
          <span className="font-semibold text-primary">
            {form.getValues('email')}
          </span>
          . Please follow the instructions in the email to reset your password.
        </p>
        <Button asChild className="w-full">
          <Link to="/login">Back to Login</Link>
        </Button>
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <Form {...form}>
      <form
        className="mx-auto flex max-w-sm flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
          <p className="text-sm text-balance text-muted-foreground">
            No problem. Enter your email address below and we'll send you a link
            to reset it.
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
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
              'Send Reset Link'
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Remember your password?{' '}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
