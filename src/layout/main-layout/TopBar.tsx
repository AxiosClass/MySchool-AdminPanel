import { RiNotification4Fill } from 'react-icons/ri';
import { UserIcon } from '@/components/shared/UserIcon';
import { useAuthStore } from '@/stores/auth';

export function TopBar() {
  const user = useAuthStore((state) => state.user)!;

  return (
    <div className='flex h-20 items-center justify-between gap-3 border-b border-primary-100 px-6'>
      <h2 className='rounded-full bg-primary-100 px-4 py-2 text-lg font-semibold'>
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
}
