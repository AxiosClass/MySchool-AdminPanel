import { cn } from '@/lib/utils';
import { CircleDashed, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import { Skeleton } from './ui/skeleton';

export const Loading = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) => (
  <CircleDashed ref={ref} className={cn('size-5 animate-spin', className)} {...props} />
));

Loading.displayName = 'Loading';

export const Loader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} className='flex w-full items-center justify-center py-3.5 text-secondary-foreground' {...props}>
    <Loading />
  </div>
));

Loader.displayName = 'Loader';

// Cards Loader
type CardsLoaderProps = { className?: { card?: string } };
export const CardsLoader = ({ className }: CardsLoaderProps) => {
  return (
    <div className='mt-6 grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {[...Array(4)].map((_, index) => (
        <Skeleton className={cn('h-52 w-full', className?.card)} key={index} />
      ))}
    </div>
  );
};

// Page Header Loader
export const PageHeaderLoader = () => {
  return (
    <div className='flex items-center justify-between px-6'>
      <Skeleton className='h-10 w-32 md:w-60' />
      <Skeleton className='h-10 w-16 md:w-40' />
    </div>
  );
};

// Page With Card Loader
export const PageWithCardLoader = () => {
  return (
    <section className='my-6'>
      <PageHeaderLoader />
      <CardsLoader />
    </section>
  );
};

// Table Loader
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

// Page With Table Loader
export const PageWithTableLoader = () => (
  <section className='my-6'>
    <PageHeaderLoader />
    <div className='mt-6'>
      <TableLoader />
    </div>
  </section>
);
