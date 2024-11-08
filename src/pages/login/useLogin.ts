import { ILoginPayload, ILoginResponse, LOGIN } from '@/lib/queries';
import { setAccessTokenToLocal, tryCatch } from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { apolloClient } from '@/apollo-client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  userId: z.string().min(1, { message: 'UserId is required' }),
  password: z.string().min(4, { message: 'Password is required' }),
});

export type TFormSchema = z.infer<typeof formSchema>;

export const useLogin = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { userId: '', password: '' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const handleLogin = form.handleSubmit(async (formData) => {
    const id = toast.loading('Logging in...');

    await tryCatch({
      id,
      tryFn: async () => {
        setIsLoading(true);
        const { userId, password } = formData;
        const response = await apolloClient.mutate<
          ILoginResponse,
          ILoginPayload
        >({
          mutation: LOGIN,
          variables: { id: userId, password },
        });

        const accessToken = response?.data?.login_action.accessToken;
        setAccessTokenToLocal(accessToken!);
        toast.success('Login was successful', { id });
        navigation('/');
      },
      finallyFn: () => {
        setIsLoading(false);
      },
    });
  });

  return { form, handleLogin, isLoading };
};
