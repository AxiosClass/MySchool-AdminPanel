import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/stores/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MainLayout() {
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
}
