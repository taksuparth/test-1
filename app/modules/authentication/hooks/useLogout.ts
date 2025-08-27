import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { axiosClient } from '@/lib/axios';

export function useLogout() {
  const navigate = useNavigate();

  const {
    mutate: _logout,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return axiosClient.post('/api/auth/logout');
    },
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
  });

  const logout = useCallback(() => {
    _logout();
  }, [_logout]);

  return {
    logout,
    isLoading,
    error,
  };
}
