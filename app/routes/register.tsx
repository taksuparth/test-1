// 1. Import the custom hook
import { useRegistration } from '~/modules/authentication/hooks/useRegistration';
import { isAuthenticated } from '~/utils/checkAuthentication';
import type { LoaderFunction, MetaFunction } from 'react-router';
import { Link, redirect } from 'react-router';
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

export const meta: MetaFunction = () => {
  return [
    { title: 'Create Account | Planeasy' },
    { name: 'description', content: 'Sign up for a new Planeasy account.' },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const isUserAuthenticated = await isAuthenticated({ request });
  if (isUserAuthenticated) {
    return redirect('/dashboard');
  }
  return {};
};

export default function RegisterForm() {
  const { form, onSubmit } = useRegistration();
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button variant="outline" type="button" className="w-full">
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
              height="24"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.15 0 5.59 1.34 7.07 2.46l5.23-5.23C32.63 3.14 28.71 1 24 1 14.73 1 6.99 6.93 3.69 15h7.89C13.19 10.93 18.18 7.5 24 7.5z"
              />
              <path
                fill="#4285F4"
                d="M46.64 24.5c0-1.63-.15-3.19-.42-4.69H24v9.19h12.65c-.54 2.93-2.26 5.41-4.82 7.05l7.54 5.86c4.41-4.06 6.97-10.04 6.97-17.41z"
              />
              <path
                fill="#FBBC05"
                d="M10.05 28.5a14.46 14.46 0 010-9H2.16a23.99 23.99 0 000 18h7.89c-.2-.63-.31-1.3-.31-2z"
              />
              <path
                fill="#34A853"
                d="M24 46.5c6.52 0 12-2.17 16-5.91l-7.54-5.86C30.74 36.82 27.63 38 24 38c-5.82 0-10.81-3.43-12.42-8.5h-7.89C6.99 41.07 14.73 46.5 24 46.5z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Sign up with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
