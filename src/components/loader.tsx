import { cn } from '@/lib/utils';
import { CircleDashed, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { TableCell, TableRow } from './ui/table';

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

type TTableBodyLoaderProps = { rows?: number; cols?: number };
export const TableBodyLoader = ({ rows = 4, cols = 4 }: TTableBodyLoaderProps) => {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: cols }).map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton className='h-10 w-full' />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export const PageWithCoverLoader = () => (
  <ScrollArea>
    <CoverLoader className='mx-6 mt-6' />
    <div className='mt-6' />
    <PostCardLoader className='px-6' />
  </ScrollArea>
);

export const CoverLoader = ({ className }: { className?: string }) => (
  <div className={cn('flex h-60 flex-col rounded-lg border p-4', className)}>
    <div className='mt-auto flex items-center justify-between gap-5'>
      <Skeleton className='h-10 w-1/3' />
      <Skeleton className='h-10 w-20' />
    </div>
  </div>
);

export const PostCardLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className='mx-auto w-full shadow-sm'>
          <CardHeader className='pb-3'>
            <div className='flex items-start justify-between'>
              <div className='flex items-center space-x-3'>
                {/* Avatar skeleton */}
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  {/* Title skeleton */}
                  <Skeleton className='h-5 w-48' />
                  {/* Metadata skeleton */}
                  <div className='flex items-center space-x-4'>
                    <Skeleton className='h-3 w-20' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                {/* Media badge skeleton */}
                <Skeleton className='h-6 w-8 rounded-full' />
                {/* Three dot menu skeleton */}
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
            <div className='space-y-3'>
              <Skeleton className='h-4 w-20' />
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} className='h-32 w-full rounded-lg' />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const StudentProfileSkeleton = ({ className }: { className?: string }) => (
  <Card className={cn('m-6 overflow-hidden border-0 bg-white', className)}>
    {/* Header */}
    <div className='flex items-center gap-4 p-6'>
      <Skeleton className='size-20 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-4 w-32' />
      </div>
    </div>
    {/* Info Items */}
    <div className='mb-6 grid grid-cols-1 gap-4 px-6 md:grid-cols-2'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='flex items-center gap-4 rounded-lg bg-muted/20 p-3'>
          <Skeleton className='size-6 rounded-md' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export const TakePaymentCardSkeleton = () => (
  <Card className='m-6 p-6'>
    <CardHeader className='items-center space-y-2'>
      <Skeleton className='size-16 rounded-full bg-primary-100/40' />
      <Skeleton className='h-6 w-32' /> {/* Title */}
      <Skeleton className='h-4 w-56' /> {/* Description */}
    </CardHeader>
    <CardContent>
      <Skeleton className='h-10 w-full rounded-md' />
    </CardContent>
  </Card>
);
