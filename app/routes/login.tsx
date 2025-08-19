import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleSignIn } from '~/hooks/useGoogleSignIn';
import { isAuthenticated } from '~/utils/checkAuthentication';
import { fetchWithCSRF } from '~/utils/fetchWithCSRF';
import { useForm } from 'react-hook-form';
import type { LoaderFunction } from 'react-router';
import { Link, redirect, useNavigate } from 'react-router';
import { z } from 'zod';
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

type Inputs = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, 'Password must be at least 8 characters'),
});

export const loader: LoaderFunction = async ({ request }) => {
  const isUserAuthenticated = await isAuthenticated({ request });
  if (isUserAuthenticated) {
    return redirect('/dashboard');
  }
  return {};
};

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const setRootError = (errorMessage: string) => {
        form.setError('email', {});
        form.setError('password', {
          message: errorMessage,
        });
      };

      try {
        const response = await fetchWithCSRF('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        const res = await response.json();
        if (res.error) {
          setRootError(res?.statusMessage ?? 'Incorrect email or passowrd');
          return;
        }
        navigate('/dashboard');
      } catch (e) {
        console.error(e);
        setRootError(e?.message ?? 'Incorrect email or passowrd');
      }
    },
    [navigate],
  );

  const { handleGoogleLogin } = useGoogleSignIn();

  return (
    <Form {...form}>
      <form
        className="mx-auto flex max-w-sm flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
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
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message ? (
            <span className="">{form.formState.errors.root.message}</span>
          ) : null}

          <Button type="submit" className="w-full">
            Login
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <svg
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
            Login with Google
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
