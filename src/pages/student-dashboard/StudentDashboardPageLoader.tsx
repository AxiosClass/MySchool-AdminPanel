import { Skeleton } from '@/components/ui/skeleton';

export const StudentInfoLoader = () => (
  <div className='mx-auto my-6 w-fit'>
    <Skeleton className='size-32' />
  </div>
);

export const StudentDashboardPageLoader = () => {
  return (
    <>
      <StudentInfoLoader />
    </>
  );
};
