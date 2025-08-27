import axios from 'axios';
import { parseCookies } from './parseCookies';

// Create a configured axios instance
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL!,
  withCredentials: true,
});

// Use an interceptor to dynamically add the CSRF token to every request
axiosClient.interceptors.request.use(
  (config) => {
    // We only need to parse cookies on the client-side
    if (typeof window !== 'undefined') {
      const parsedCookies = parseCookies(document.cookie);
      const csrfToken = parsedCookies['csrf_token'];

      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }

      if (
        config.method === 'post' ||
        config.method === 'put' ||
        config.method === 'patch'
      ) {
        config.headers['Content-Type'] = 'application/json';
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
