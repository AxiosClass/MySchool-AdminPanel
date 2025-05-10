import { Skeleton } from '@/components/ui/skeleton';

export const AttendanceSummarySkeleton = () => (
  <div className='grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3'>
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className='h-20' />
    ))}
  </div>
);

export const BarChartLoader = () => <Skeleton className='h-[500px] w-full' />;

export const DashboardPageLoader = () => (
  <div className='p-6'>
    <AttendanceSummarySkeleton />
    <div className='mt-6' />
    <BarChartLoader />
  </div>
);
