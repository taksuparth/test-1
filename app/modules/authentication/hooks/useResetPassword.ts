import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import z from 'zod';
import { axiosClient } from '@/lib/axios';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type Inputs = z.infer<typeof resetPasswordSchema>;

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await axiosClient.post('/api/auth/reset-password', {
        token,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error: any) => {
      form.setError('root', {
        message:
          error?.message ?? 'Invalid or expired token. Please try again.',
      });
    },
  });

  const onSubmit = (data: Inputs) => {
    resetPassword(data);
  };

  return { onSubmit, form, isLoading, isSuccess, token };
};
