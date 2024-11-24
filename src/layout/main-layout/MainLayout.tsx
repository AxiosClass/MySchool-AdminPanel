import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const MainLayout = () => {
  const user = useAuthStore((state) => state.user);

  return user ? (
    <section className='grid min-h-screen bg-background md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar />
        <main className='customized_scrollbar h-full overflow-y-auto rounded-t-xl px-5 py-6 pb-6'>
          <Outlet />
        </main>
      </section>
    </section>
  ) : (
    <Navigate to={'/login'} />
  );
};
