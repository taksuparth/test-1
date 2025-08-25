import type { QueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { axiosClient } from '@/lib/axios';
import { parseCookies } from '@/lib/parseCookies';

export const CURRENT_USER_QUERY_KEY = 'currentUser';

export const checkAuthentication = async ({
  request,
  queryClient,
}: {
  request: LoaderFunctionArgs['request'];
  queryClient: QueryClient;
}) => {
  const rawCookie = request.headers.get('cookie');

  if (!rawCookie) {
    throw redirect('/login');
  }

  const cookies = parseCookies(rawCookie);
  const csrfToken = cookies['csrf_token'];

  if (!csrfToken) {
    throw redirect('/login');
  }

  try {
    const currentUserResponse = await queryClient.fetchQuery<
      AxiosResponse<{ user: { id: string; email: string } }>
    >({
      queryKey: [CURRENT_USER_QUERY_KEY],
      queryFn: () =>
        axiosClient.get('/api/user/currentUser', {
          headers: {
            ...Object.fromEntries(request.headers),
            'X-CSRF-Token': csrfToken,
          },
        }),
    });

    const user = currentUserResponse.data;

    if (currentUserResponse.status !== 200 || !user) {
      throw redirect('/login', 302);
    }

    return { user: user.user };
  } catch (error) {
    console.error('Unauthorized:', (error as Error)?.message);
    throw redirect('/login', 302);
  }
};

export const isAuthenticated = async ({
  request,
  queryClient,
}: {
  request: LoaderFunctionArgs['request'];
  queryClient: QueryClient;
}) => {
  const rawCookie = request.headers.get('cookie');

  if (!rawCookie) {
    return false;
  }

  const cookies = parseCookies(rawCookie);
  const csrfToken = cookies['csrf_token'];

  if (!csrfToken) {
    return false;
  }

  try {
    const currentUserResponse = await queryClient.fetchQuery({
      queryKey: [CURRENT_USER_QUERY_KEY],
      queryFn: () =>
        axiosClient.get('/api/user/currentUser', {
          headers: {
            ...Object.fromEntries(request.headers),
            'X-CSRF-Token': csrfToken,
          },
        }),
    });

    const user = currentUserResponse.data;

    if (currentUserResponse.status !== 200 || !user) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
