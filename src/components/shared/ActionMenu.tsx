import { ReactNode } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { MoreVerticalIcon } from 'lucide-react';

export const ActionMenu = ({ open, onOpenChange, children, className }: TActionMenuProps) => (
  <DropdownMenu open={open} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>
      <Button variant='ghost'>
        <MoreVerticalIcon className='size-4' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='min-w-60 border border-gray-200'>
      <div className={cn('flex flex-col gap-2 p-2', className?.childrenContainer)}>{children}</div>
    </DropdownMenuContent>
  </DropdownMenu>
);

type TActionMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: { childrenContainer?: string };
};
