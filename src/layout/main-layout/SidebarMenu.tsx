import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AppLogo } from '@/components/shared/AppLogo';
import { CustomSheet } from '@/components/shared/CustomSheet';
import { SheetClose, SheetHeader } from '@/components/ui/sheet';
import { isActive, useSidebarLinks } from './sidebarLinks';

export const SidebarMenu = () => {
  const location = useLocation();
  const sidebarLinks = useSidebarLinks();

  return (
    <CustomSheet
      trigger={<MenuIcon />}
      header={
        <SheetHeader className='p-0'>
          <AppLogo />
        </SheetHeader>
      }
      className={{ content: 'p-0' }}
    >
      <section className='mt-4 flex flex-col gap-1 px-4'>
        {sidebarLinks?.map(({ icon, title, url }) => (
          <Link
            key={url}
            to={url}
            className={cn('rounded-md', isActive(url, location.pathname) && 'bg-primary text-white')}
          >
            <SheetClose className='flex items-center gap-2 rounded-full px-2 py-1' key={url}>
              {icon} {title}
            </SheetClose>
          </Link>
        ))}
      </section>
    </CustomSheet>
  );
};
