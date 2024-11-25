import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  message: string;
}

export function Message({ className, message }: IProps) {
  return <p className={cn('mt-2 w-full text-center font-bold', className)}>{message}</p>;
}
