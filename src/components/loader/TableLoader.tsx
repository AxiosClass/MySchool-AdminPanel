import { Skeleton } from '../ui/skeleton';

export const TableLoader = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-10' />
      {[...Array(4)].map((_, index) => (
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
