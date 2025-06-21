import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '@/api/query';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input, PasswordInput } from '@/components/ui/input';
import { CommonFormField } from '@/components/shared/form';
import { AppLogo, PageTitle } from '@/components/shared';
import { useAuthStore } from '@/stores/auth';
import { errorToast, setAccessTokenToLocal } from '@/helpers';
import { BookOpen, GraduationCap, Shield, Sparkles, Users, User } from 'lucide-react';

// === Main Component ===
export default function LoginPage() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: '', password: '', type: 'admin' },
  });

  const { mutate, isPending } = useMutation({ mutationFn: login });
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const navigation = useNavigate();

  const selectedRole = form.watch('type');
  const RoleIcon = roleIcons[selectedRole as keyof typeof roleColors];

  const handleLogin = form.handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        setAccessTokenToLocal(res.data.accessToken);
        updateUser(res.data.accessToken);
        toast.success(res.message);
        navigation(NAVIGATION_CONFIG[formData.type]);
      },
      onError: errorToast,
    });
  });

  if (user) return <Navigate to={NAVIGATION_CONFIG[user.role]} />;

  return (
    <>
      <PageTitle title='Login' />
      <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4'>
        <LoginDecorations />

        <div className='relative z-10 w-full max-w-md'>
          <Card className='border bg-card/95 shadow-lg backdrop-blur-sm'>
            <CardHeader className='pb-2 text-center'>
              <div className='mx-auto mb-4 flex items-center justify-center'>
                <AppLogo />
              </div>
              <CardTitle className='text-2xl font-bold'>Welcome Back</CardTitle>
              <CardDescription>Sign in to access your educational portal</CardDescription>
            </CardHeader>

            <CardContent className='space-y-6'>
              <Form {...form}>
                <form onSubmit={handleLogin} className='space-y-4'>
                  <RoleSelector selectedRole={selectedRole} setRole={(role) => form.setValue('type', role)} />

                  <div className='flex justify-center'>
                    <Badge
                      variant='secondary'
                      className={`${roleColors[selectedRole as keyof typeof roleColors]} px-3 py-1`}
                    >
                      <RoleIcon size={14} className='mr-1' />
                      Signing in as {selectedRole}
                    </Badge>
                  </div>

                  <CommonFormField control={form.control} name='id' label='User ID'>
                    {({ field }) => (
                      <div className='relative'>
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <Input {...field} placeholder='Enter your user ID' className='h-12 pl-10' />
                      </div>
                    )}
                  </CommonFormField>

                  <CommonFormField control={form.control} name='password' label='Password'>
                    {({ field }) => (
                      <PasswordInput {...field} placeholder='Enter your password' className='h-12' />
                    )}
                  </CommonFormField>

                  <Button type='submit' className='h-12 w-full' disabled={isPending}>
                    {isPending ? (
                      <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                        Signing in...
                      </div>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <RoleIcon size={18} />
                        Sign In
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className='border-t pt-4 text-center text-xs text-muted-foreground'>
                Secure access to your educational platform
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// === Role Selector ===
const RoleSelector = ({
  selectedRole,
  setRole,
}: {
  selectedRole: string;
  setRole: (val: string) => void;
}) => (
  <div className='space-y-2'>
    <label className='text-sm font-medium text-gray-700'>Login As</label>
    <div className='grid grid-cols-3 gap-2'>
      {loginTypeOptions.map((option) => {
        const Icon = roleIcons[option.value];
        const isSelected = selectedRole === option.value;
        return (
          <button
            key={option.value}
            type='button'
            onClick={() => setRole(option.value)}
            className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all ${
              isSelected
                ? 'scale-105 border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-border/80 hover:bg-accent/50'
            }`}
          >
            <Icon size={20} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
            <span className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

// === Background Decorations ===
const LoginDecorations = () => (
  <>
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-primary/10 opacity-70 blur-xl'></div>
      <div className='absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-secondary/20 opacity-70 blur-xl delay-1000'></div>
      <div className='absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/15 opacity-70 blur-xl delay-500'></div>
    </div>
    <div className='absolute left-20 top-20 animate-bounce text-muted-foreground/40'>
      <BookOpen size={24} />
    </div>
    <div className='absolute right-32 top-32 animate-bounce text-muted-foreground/40 delay-300'>
      <GraduationCap size={28} />
    </div>
    <div className='absolute bottom-20 left-32 animate-bounce text-muted-foreground/40 delay-700'>
      <Sparkles size={20} />
    </div>
    <div className='absolute bottom-32 right-20 animate-bounce text-muted-foreground/40 delay-1000'>
      <Users size={26} />
    </div>
  </>
);

// === Schema and Types ===
const formSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  password: z.string().min(1, 'Password is required'),
  type: z.string(),
});
type TFormSchema = z.infer<typeof formSchema>;

// === Config Maps ===
const loginTypeOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Student', value: 'student' },
] as const;

const NAVIGATION_CONFIG: Record<string, string> = {
  admin: '/',
  teacher: '/teacher',
  student: '/student',
  ADMIN: '/',
  TEACHER: '/teacher',
  STUDENT: '/student',
  SUPER_ADMIN: '/',
};

const roleIcons = {
  admin: Shield,
  teacher: Users,
  student: GraduationCap,
};

const roleColors = {
  admin: 'bg-destructive/10 text-destructive border-destructive/20',
  teacher: 'bg-primary/10 text-primary border-primary/20',
  student: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
};
