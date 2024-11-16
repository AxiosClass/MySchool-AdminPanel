import { Link, useLocation } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { sidebarLinks } from './sidebarLinks';
import { AppLogo } from '@/components/shared';
import { FaUser } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

const isActive = (url: string, pathname: string) => {
  if (url === pathname) return true;
  if (url === '/classes' && pathname.startsWith('/class')) return true;
};

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className='hidden min-h-screen min-w-[240px] flex-col border-r border-primary-100 shadow md:flex'>
      <AppLogo />
      <div className='mt-2 flex flex-col gap-2 px-6'>
        {sidebarLinks.map(({ url, icon, title }) => (
          <Link
            key={url}
            to={url}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 hover:bg-neutral-300 hover:text-black',
              isActive(url, pathname) && 'bg-primary text-white',
            )}
          >
            <span>{icon}</span>
            <span>{title}</span>
          </Link>
        ))}
      </div>
      <div className='mt-auto flex items-center justify-between border-t border-primary-100 p-6'>
        <div className='rounded-full bg-white p-2 text-red-600'>
          <BiLogOutCircle size={20} />
        </div>
        <div className='rounded-full bg-white p-2'>
          <IoMdSettings size={20} />
        </div>
        <div className='rounded-full bg-white p-2'>
          <FaUser size={20} />
        </div>
      </div>
    </aside>
  );
};
