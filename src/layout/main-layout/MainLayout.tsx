import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MainLayout = () => {
  const user = useAuthStore((state) => state.user);

  return user ? (
    <section className='grid min-h-screen bg-background md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar />
        <ScrollArea className='customized_scrollbar h-full rounded-t-xl px-6'>
          <Outlet />
        </ScrollArea>
      </section>
    </section>
  ) : (
    <Navigate to={'/login'} />
  );
};
