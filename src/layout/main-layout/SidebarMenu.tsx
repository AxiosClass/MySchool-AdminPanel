import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AppLogo } from '@/components/shared/AppLogo';
import { isActive, sidebarLinks } from './sidebarLinks';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function SidebarMenu() {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className='max-w-60' side='left'>
        <SheetTitle>
          <AppLogo />
        </SheetTitle>
        <SheetDescription className='sr-only'>Sheet Description</SheetDescription>
        <section className='mt-4 flex flex-col gap-1'>
          {sidebarLinks.map(({ icon, title, url }) => (
            <Link
              key={url}
              to={url}
              className={cn('rounded-full', isActive(url, location.pathname) && 'bg-primary text-white')}
            >
              <SheetClose className='flex items-center gap-2 rounded-full px-2 py-1' key={url}>
                {icon} {title}
              </SheetClose>
            </Link>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}
