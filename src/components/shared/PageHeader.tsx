import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { PropsWithChildren, ReactNode } from 'react';
import { ArrowBigLeftDashIcon } from 'lucide-react';

type TProps = PropsWithChildren<{ label: string | ReactNode; backLink?: string; className?: { container?: string } }>;

export function PageHeader({ label, children, backLink, className }: TProps) {
  return (
    <section className={cn('flex items-center gap-4 py-6', className?.container)}>
      {backLink && (
        <Link to={backLink}>
          <Button className='size-8'>
            <span>
              <ArrowBigLeftDashIcon className='size-6 text-white' />
            </span>
          </Button>
        </Link>
      )}
      {typeof label === 'string' ? <p className='hidden text-lg font-semibold md:block'>{label}</p> : label}
      <div className='ml-auto'>{children}</div>
    </section>
  );
}
