import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const StudentDashboardPageLoader = () => {
  return (
    <>
      <StudentInfoLoader />
      <StudentAttendanceLoader className='p-6' />
    </>
  );
};

export const StudentInfoLoader = () => (
  <div className='mx-auto my-6 w-fit'>
    <Skeleton className='mb-6 size-40 rounded-full' />
    <Skeleton className='h-20' />
  </div>
);

export const StudentAttendanceLoader = ({ className }: { className?: string }) => (
  <div className={cn('grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7', className)}>
    {Array.from({ length: 12 }).map((_, index) => (
      <Skeleton key={index} className='h-40 w-full' />
    ))}
  </div>
);
