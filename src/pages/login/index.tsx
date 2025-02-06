import { z } from 'zod';
import { toast } from 'sonner';
import { login } from '@/api/query';
import { Form } from '@/components/ui/form';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { PageTitle, AppLogo } from '@/components/shared';
import { Navigate, useNavigate } from 'react-router-dom';
import { errorMessageGen, setAccessTokenToLocal } from '@/helpers';
import { CommonFormField } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  id: z.string().min(1, { message: 'UserId is required' }),
  password: z.string().min(4, { message: 'Password is required' }),
});

export type TFormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<TFormSchema>({ resolver: zodResolver(formSchema), defaultValues: { id: '', password: '' } });
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const navigation = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setAccessTokenToLocal(res.data.accessToken);
      updateUser(res.data.accessToken);
      toast.success(res.message);
      navigation('/');
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleLogin = form.handleSubmit((formData) => mutate(formData));

  if (user) return <Navigate to={'/'} />;

  return (
    <PageTitle title='Login'>
      <div className='relative flex h-screen flex-col items-center justify-center overflow-hidden bg-baseLight-400'>
        <img
          className='absolute -top-12 left-1/2 translate-x-[-50%] md:-top-28'
          width={450}
          src='/asset/education/bro.png'
          alt=''
        />

        <Form {...form}>
          <form
            className='flex w-full max-w-[350px] flex-col items-center gap-3 rounded-md border p-6 px-6'
            onSubmit={handleLogin}
          >
            <AppLogo />
            <h3 className='text-center text-muted-foreground'>Input Your Credentials to Login</h3>
            <CommonFormField control={form.control} name='id' label='Id' className={{ formItem: 'w-full' }}>
              {({ field }) => <Input {...field} placeholder='Input your id' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='password' label='Password' className={{ formItem: 'w-full' }}>
              {({ field }) => <Input {...field} placeholder='Input your password' type='password' />}
            </CommonFormField>
            <Button className='mt-4 w-full' isLoading={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>

        <img
          className='absolute -bottom-20 left-1/2 translate-x-[-50%] md:-bottom-36'
          width={450}
          src='/asset/high-school/bro.png'
          alt=''
        />
      </div>
    </PageTitle>
  );
}
