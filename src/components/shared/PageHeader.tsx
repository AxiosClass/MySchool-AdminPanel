import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { PropsWithChildren, ReactNode } from 'react';
import { ArrowBigLeftDashIcon } from 'lucide-react';

type TPageHeaderProps = PropsWithChildren<{
  label: string | ReactNode;
  backLink?: string;
  containerClassName?: string;
  childContainerClassName?: string;
}>;

export const PageHeader = ({
  label,
  children,
  backLink,
  containerClassName,
  childContainerClassName,
}: TPageHeaderProps) => {
  return (
    <section className={cn('my-6 flex items-center gap-4 px-6', containerClassName)}>
      {backLink && (
        <Link to={backLink}>
          <Button size='icon'>
            <ArrowBigLeftDashIcon className='size-6 text-white' />
          </Button>
        </Link>
      )}
      {typeof label === 'string' ? <p className='hidden text-nowrap text-lg font-semibold md:block'>{label}</p> : label}
      <div className={cn('ml-auto', childContainerClassName)}>{children}</div>
    </section>
  );
};
