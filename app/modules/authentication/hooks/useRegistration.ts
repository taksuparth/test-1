import { useState } from 'react'; // Import useState
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { axiosClient } from '@/lib/axios';

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

const registerUser = async (values: Omit<Inputs, 'confirmPassword'>) => {
  const { data } = await axiosClient.post('/api/auth/register', values);
  return data;
};

export function useRegistration() {
  const [isSuccess, setIsSuccess] = useState(false);

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

  const {
    mutate: performRegistration,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // 2. On success, update the state instead of navigating
      setIsSuccess(true);
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.statusMessage ||
        'Registration failed. Please try again.';
      form.setError('root', { message: errorMessage });
      console.error('Registration failed:', err);
    },
  });

  const onSubmit = (values: Inputs) => {
    const { confirmPassword, ...registrationData } = values;
    performRegistration(registrationData);
  };

  return { form, onSubmit, isPending, error, isSuccess };
}
