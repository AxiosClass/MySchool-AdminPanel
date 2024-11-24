import { PasswordInput, TextInput } from '@/components/shared/form';
import { AppLogo, PageTitle } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useLogin } from './useLogin';

export default function LoginPage() {
  const { form, handleLogin, isLoading } = useLogin();

  return (
    <PageTitle title='Login'>
      <div className='relative flex h-screen flex-col items-center justify-center overflow-hidden bg-baseLight-400'>
        <img
          className='absolute -top-12 left-1/2 translate-x-[-50%] md:-top-28'
          width={600}
          src='/public/asset/education/bro.png'
          alt=''
        />

        <Form {...form}>
          <form
            className='flex w-full max-w-[350px] flex-col items-center gap-3 rounded-md border p-6 px-6'
            onSubmit={handleLogin}
          >
            <AppLogo />
            <h3 className='text-center text-muted-foreground'>
              Input Your Credentials to Login
            </h3>
            <TextInput
              control={form.control}
              label='Id'
              name='id'
              placeholder='@ john-doe'
            />

            <PasswordInput
              control={form.control}
              label='Password'
              name='password'
              placeholder='****'
            />

            <Button className='mt-4 w-full' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>

        <img
          className='absolute -bottom-20 left-1/2 translate-x-[-50%] md:-bottom-36'
          width={600}
          src='/public/asset/high-school/bro.png'
          alt=''
        />
      </div>
    </PageTitle>
  );
}
