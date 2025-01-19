import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/stores/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MainLayout() {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to='/login' />;

  return (
    <section className='grid min-h-screen bg-background md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='flex h-dvh flex-col'>
        <div>
          <TopBar />
        </div>
        <ScrollArea className='grow p-6'>
          <Outlet />
        </ScrollArea>
      </section>
    </section>
  );
}
