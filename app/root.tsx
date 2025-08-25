import { useState, type ReactNode } from 'react';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTheme } from 'next-themes';
import type { LinksFunction, LoaderFunctionArgs } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { createQueryClient } from '@/lib/query-client';
import { useDehydratedState } from '@/hooks/use-dehydrated-state';
import { Toaster } from '@/components/ui/sonner';
import { ForbiddenError } from './components/atoms/errors/ForbiddenError';
import { GeneralError } from './components/atoms/errors/GeneralError';
import { MaintenanceError } from './components/atoms/errors/MaintainenceError';
import { NotFoundError } from './components/atoms/errors/NotFoundError';
import { UnauthorisedError } from './components/atoms/errors/UnauthorisedError';
import { AuthLayout } from './components/layout/AuthLayout';
import ThemeProvider from './components/layout/themeToggle/ThemeProvider';
import { ActiveThemeProvider } from './context/activeTheme';
import tailwindCss from './tailwind.css?url';
import { isAuthenticated } from './utils/checkAuthentication';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: tailwindCss,
  },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const queryClient = createQueryClient();

  const isUserAuthenticated = await isAuthenticated({ request, queryClient });

  return {
    isAuthenticated: isUserAuthenticated,
  };
};

export function Layout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  const dehydratedState = useDehydratedState();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              {children}
            </ThemeProvider>
            <ScrollRestoration />
            <Scripts />
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as { status: number };

  if (error.status === 401) {
    return <ForbiddenError />;
  }

  if (error.status === 403) {
    return <UnauthorisedError />;
  }

  if (error.status === 404) {
    return <NotFoundError />;
  }

  if (error.status === 500) {
    return <GeneralError />;
  }

  if (error.status === 503) {
    return <MaintenanceError />;
  }

  return null;
}

export default function App() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  const { resolvedTheme } = useTheme();

  return (
    <ActiveThemeProvider initialTheme={resolvedTheme}>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      )}
    </ActiveThemeProvider>
  );
}
