import { SidebarMenu } from './SidebarMenu';
import { useAuthStore } from '@/stores/auth';
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

      <UserIcon username={user.name} />
    </div>
  );
};
