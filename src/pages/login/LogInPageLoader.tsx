import { Skeleton } from '@/components/ui/skeleton';

export function LogInPageLoader() {
  return (
    <section className='mt-6 flex h-dvh items-center justify-center'>
      <div className='flex w-36 flex-col items-center justify-center rounded-md border md:w-[350px]'>
        <Skeleton className='mt-12 h-20 md:w-36' />
        <Skeleton className='mt-6 h-5 md:w-60' />
        <Skeleton className='mt-8 h-10 md:w-[300px]' />
        <Skeleton className='mt-8 h-10 md:w-[300px]' />
        <Skeleton className='mb-6 mt-6 h-10 md:w-[300px]' />
      </div>
    </section>
  );
}
