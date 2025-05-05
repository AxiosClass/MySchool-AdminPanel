import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export const TableLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-2 px-6', className)}>
      <Skeleton className='h-10' />
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      ))}
    </div>
  );
};
