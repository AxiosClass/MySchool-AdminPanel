import { Skeleton } from '../ui/skeleton';

export function PageHeaderLoader() {
  return (
    <div className='flex items-center justify-between'>
      <Skeleton className='h-10 w-32 md:w-60' />
      <Skeleton className='h-10 w-16 md:w-40' />
    </div>
  );
}
