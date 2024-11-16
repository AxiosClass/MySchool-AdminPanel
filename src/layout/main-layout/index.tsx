import { ScrollArea } from '@/components/ui/scroll-area';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const MainLayout = () => {
  return (
    <section className='grid min-h-screen bg-background md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar />
        <ScrollArea className='customized_scrollbar h-full rounded-t-xl px-6 pb-6'>
          <Outlet />
        </ScrollArea>
      </section>
    </section>
  );
};
