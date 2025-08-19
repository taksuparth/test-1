import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchWithCSRF } from '~/utils/fetchWithCSRF';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Inputs = z.infer<typeof registerSchema>;

export function useRegistration() {
  const navigate = useNavigate();

  const form = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = useCallback(
    async (values: Inputs) => {
      try {
        const response = await fetchWithCSRF('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const res = await response.json();

        if (!response.ok || res.error) {
          throw new Error(res.statusMessage || 'An unknown error occurred.');
        }

        // On successful registration, navigate to the dashboard
        navigate('/dashboard');
      } catch (e: any) {
        console.error('Registration failed:', e);
        form.setError('root', {
          message: e.message || 'Registration failed. Please try again.',
        });
      }
    },
    [navigate, form],
  );

  return { form, onSubmit };
}
