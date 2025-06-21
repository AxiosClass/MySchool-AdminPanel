import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';
import { isActive, useSidebarLinks } from './sidebarLinks';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { AppLogo } from '@/components/shared/AppLogo';
import { ChangePassword } from '@/components/shared/ChangePassword';
import { TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const { pathname } = useLocation();
  const sidebarLinks = useSidebarLinks();

  return (
    <aside className='hidden min-h-screen min-w-[240px] flex-col border-r shadow md:flex'>
      <AppLogo />
      <div className='mt-2 flex flex-col gap-1 px-6'>
        {sidebarLinks?.map(({ url, icon, title }) => (
          <Link
            key={url}
            to={url}
            className={cn(
              'flex items-center gap-2 rounded-md px-4 py-2 hover:bg-neutral-300 hover:text-black',
              isActive(url, pathname) && 'bg-primary text-white',
            )}
          >
            <span>{icon}</span>
            <span>{title}</span>
          </Link>
        ))}
      </div>
      <div className='mt-auto flex items-center justify-between border-t p-6'>
        <Logout />
        <ChangePassword />
      </div>
    </aside>
  );
};

const Logout = () => {
  const removeUser = useAuthStore((s) => s.removeUser);

  const handleLogout = () => {
    toast.info('You have been logged out');
    removeUser();
  };

  return (
    <TooltipContainer label='Logout'>
      <Button onClick={handleLogout} variant='outline' size='icon'>
        <BiLogOutCircle className='size-4 text-destructive' />
      </Button>
    </TooltipContainer>
  );
};
