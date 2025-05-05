import { Skeleton } from '@/components/ui/skeleton';

export const StudentInfoLoader = () => (
  <div className='mx-auto my-6 w-fit'>
    <Skeleton className='mb-6 size-40 rounded-full' />
    <Skeleton className='h-20' />
  </div>
);

export const StudentDashboardPageLoader = () => {
  return (
    <>
      <StudentInfoLoader />
    </>
  );
};
