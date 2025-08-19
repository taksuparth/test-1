import { parseCookies } from '~/utils/parseCookies';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { fetchWithCSRF } from './fetchWithCSRF';

export const checkAuthentication = async ({
  request,
}: {
  request: LoaderFunctionArgs['request'];
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

  const currentUserResponse = await fetchWithCSRF('/api/user/currentUser', {
    cookies,
    headers: Object.fromEntries(request.headers),
  });

  const user = await currentUserResponse.json();

  if (currentUserResponse.status !== 200 || !user) {
    throw redirect('/login');
  }

  return { user: user.user };
};

export const isAuthenticated = async ({
  request,
}: {
  request: LoaderFunctionArgs['request'];
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

  const currentUserResponse = await fetchWithCSRF('/api/user/currentUser', {
    cookies,
    headers: Object.fromEntries(request.headers),
  });
  const user = await currentUserResponse.json();
  if (currentUserResponse.status !== 200 || !user) {
    return false;
  }

  return true;
};
