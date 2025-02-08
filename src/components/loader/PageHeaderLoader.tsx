import { Skeleton } from '../ui/skeleton';

export const PageHeaderLoader = () => {
  return (
    <div className='flex items-center justify-between px-6'>
      <Skeleton className='h-10 w-32 md:w-60' />
      <Skeleton className='h-10 w-16 md:w-40' />
    </div>
  );
};
