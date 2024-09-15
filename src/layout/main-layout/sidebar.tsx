import { Link, useLocation } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { Logo } from '@/components/shared/logo';
import { IoMdSettings } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { links } from './links';

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className='hidden min-h-screen min-w-[240px] flex-col p-6 md:flex'>
      <Logo />
      <div className='mt-8 flex flex-col gap-2'>
        {links.map(({ url, icon, title }) => (
          <Link
            key={url}
            to={url}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 hover:bg-neutral-300 hover:text-black',
              pathname === url && 'bg-primary text-white',
            )}
          >
            <span>{icon}</span>
            <span>{title}</span>
          </Link>
        ))}
      </div>
      <div className='mt-auto flex items-center justify-between'>
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
