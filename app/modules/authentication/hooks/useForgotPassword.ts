import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import z from 'zod';
import { axiosClient } from '@/lib/axios';

const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
});

type Inputs = z.infer<typeof forgotPasswordSchema>;

export const useForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [searchParams] = useSearchParams();

  const emailFromQuery = useMemo(
    () => searchParams.get('email') || '',
    [searchParams],
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: emailFromQuery,
    },
  });

  const { mutate: sendResetLink, isPending: isLoading } = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axiosClient.post(
        '/api/auth/forgot-password',
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      setEmailSent(true);
    },
    onError: (error: any) => {
      form.setError('root', {
        message:
          error?.message ?? 'An unexpected error occurred. Please try again.',
      });
    },
  });

  const onSubmit = (data: Inputs) => {
    sendResetLink(data);
  };

  return { onSubmit, form, isLoading, emailSent };
};
