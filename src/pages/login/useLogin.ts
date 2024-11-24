import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { axiosInstance } from '@/data-fetching/axiosInstance';
import { IServerResponse } from '@/lib/types/common';
import { setAccessTokenToLocal } from '@/helpers/tokenHelper';
import { apiUrl } from '@/data-fetching/apiUrl';
import { tryCatch } from '@/helpers/tryCatch';

const formSchema = z.object({
  id: z.string().min(1, { message: 'UserId is required' }),
  password: z.string().min(4, { message: 'Password is required' }),
});

export type TFormSchema = z.infer<typeof formSchema>;

export const useLogin = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: '', password: '' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const handleLogin = form.handleSubmit(async (formData) => {
    const id = toast.loading('Logging in...');

    await tryCatch({
      id,
      tryFn: async () => {
        setIsLoading(true);
        const { id: userId, password } = formData;
        const response = await axiosInstance.post(apiUrl.login, {
          id: userId,
          password,
        });

        const responseData: IServerResponse<{ accessToken: string }> =
          response.data;

        setAccessTokenToLocal(responseData.data.accessToken);
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
