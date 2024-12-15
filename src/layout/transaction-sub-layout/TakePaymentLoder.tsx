import { Skeleton } from '@/components/ui/skeleton';

export function TakePaymentLoader() {
  return (
    <div className='mt-6 flex flex-col items-center gap-7'>
      <Skeleton className='h-12 w-36 md:w-[450px]'>
        <Skeleton className='ml-auto h-full w-16' />
      </Skeleton>
      <Skeleton className='h-7 w-16 md:w-56' />
    </div>
  );
}
