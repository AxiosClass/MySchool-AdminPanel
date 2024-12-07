import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface IProps {
  className?: { card?: string };
}

export function CardsLoader({ className }: IProps) {
  return (
    <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {[...Array(4)].map((_, index) => (
        <Skeleton className={cn('h-52 w-full', className?.card)} key={index} />
      ))}
    </div>
  );
}
