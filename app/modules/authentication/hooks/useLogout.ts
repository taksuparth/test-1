import { useCallback } from 'react';
import { fetchWithCSRF } from '~/utils/fetchWithCSRF'; // Adjust path if needed
import { useNavigate } from 'react-router';

export function useLogout() {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      // 1. Call the backend API to invalidate the session cookie.
      await fetchWithCSRF('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Log the error but proceed with client-side cleanup regardless.
      console.error('Logout API call failed:', error);
    } finally {
      // 3. Redirect the user to the login page.
      // The `replace: true` option prevents the user from navigating back to the protected page.
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return { logout };
}
