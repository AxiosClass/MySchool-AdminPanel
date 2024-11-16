import { ScrollArea } from '@/components/ui/scroll-area';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAuth } from '@/stores/auth';

export const MainLayout = () => {
  const user = useAuth((state) => state.user);

  if (!user) return <Navigate to={'/login'} />;

  return (
    <section className='grid min-h-screen bg-background md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar />
        <ScrollArea className='customized_scrollbar h-full rounded-t-xl px-6'>
          <Outlet />
        </ScrollArea>
      </section>
    </section>
  );
};
