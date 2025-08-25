import {
  redirect,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from 'react-router';
import { createQueryClient } from '@/lib/query-client';
import { checkAuthentication, isAuthenticated } from './checkAuthentication';

export async function authCheckLoader({ request }: LoaderFunctionArgs) {
  const queryClient = createQueryClient();
  const { user } = await checkAuthentication({ request, queryClient });

  return { user };
}

export const authPageLoader: LoaderFunction = async ({ request }) => {
  const queryClient = createQueryClient();
  const isUserAuthenticated = await isAuthenticated({ request, queryClient });

  if (isUserAuthenticated) {
    return redirect('/dashboard');
  }

  return {};
};
