import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const MainLayout = () => {
  return (
    <section className='grid min-h-screen bg-background md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar />
        <main className='customized_scrollbar h-full overflow-y-auto rounded-t-xl bg-gray-50 px-5 py-6 pb-6'>
          <Outlet />
        </main>
      </section>
    </section>
  );
};
