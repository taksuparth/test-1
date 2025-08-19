import { parseCookies } from './parseCookies';

export const fetchWithCSRF = async (
  url: string,
  options: RequestInit & { cookies?: Record<string, string> } = {},
) => {
  const parsedCookies = options.cookies || parseCookies(document.cookie);
  const csrfToken = parsedCookies['csrf_token'];

  return fetch(`${'http://localhost:3000'}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken || '',
    },
    credentials: 'include',
  });
};
