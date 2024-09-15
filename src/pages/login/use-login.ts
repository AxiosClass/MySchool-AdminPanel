import {
  setRefreshTokenToLocal,
  setAccessTokenToLocal,
  fetchHelper,
  tryCatch,
} from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ERequestMethod } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { apiUrl } from '@/data/api-url';
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
        const response = await fetchHelper({
          url: apiUrl.login,
          method: ERequestMethod.POST,
          body: formData,
        });

        console.log(response);

        if (!response?.ok) throw Error(response?.message);
        toast.success(response?.message, { id });

        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        setAccessTokenToLocal(accessToken);
        setRefreshTokenToLocal(refreshToken);

        navigation('/');
      },

      finallyFn: () => {
        setIsLoading(false);
      },
    });
  });

  return { form, handleLogin, isLoading };
};
