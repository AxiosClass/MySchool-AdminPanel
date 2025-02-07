import { SidebarMenu } from './SidebarMenu';
import { useAuthStore } from '@/stores/auth';
import { RiNotification4Fill } from 'react-icons/ri';
import { UserIcon } from '@/components/shared/UserIcon';

export const TopBar = () => {
  const user = useAuthStore((state) => state.user)!;

  return (
    <div className='flex h-header shrink-0 items-center justify-between gap-3 border-b px-6'>
      <div className='md:hidden'>
        <SidebarMenu />
      </div>
      <h2 className='hidden rounded-md bg-primary-100 px-4 py-2 text-lg font-semibold md:block'>
        Greetings {user.name} 👋
      </h2>
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <RiNotification4Fill className='text-primary' size={32} />
          <span className='absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white'>
            9+
          </span>
        </div>
        <UserIcon username={user.name} />
      </div>
    </div>
  );
};
