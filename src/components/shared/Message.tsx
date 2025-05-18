import { cn } from '@/lib/utils';
import { MdError } from 'react-icons/md';

const CONFIG = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};

type TMessageProps = { className?: string; message: string; position?: 'start' | 'center' | 'end' };

export const Message = ({ className, message, position = 'center' }: TMessageProps) => {
  const positionClass = CONFIG[position];

  return (
    <p className={cn('mt-2 flex w-full items-center justify-center gap-2 font-semibold', positionClass, className)}>
      <MdError />
      {message}
    </p>
  );
};
