import type { ReactNode } from 'react';
import type { LinksFunction, LoaderFunctionArgs } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import { AuthLayout } from './components/layout/AuthLayout';
import PageLayout from './components/layout/PageLayout';
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
  const isUserAuthenticated = await isAuthenticated({ request });
  return { isAuthenticated: isUserAuthenticated };
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
