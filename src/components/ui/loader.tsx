import { cn } from '@/lib/utils';
import { CircleDashed, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

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
