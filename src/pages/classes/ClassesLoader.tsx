import { Skeleton } from '@/components/ui/skeleton';

export function ClassesLoader() {
  return (
    <section className='my-6'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-10 w-32 md:w-60' />
        <Skeleton className='h-10 w-16 md:w-40' />
      </div>
      <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {[...Array(4)].map((_, index) => (
          <Skeleton className='h-52 w-full' key={index} />
        ))}
      </div>
    </section>
  );
}
