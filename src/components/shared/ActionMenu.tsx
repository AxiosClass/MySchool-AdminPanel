import { ReactNode } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const ActionMenu = ({ open, onOpenChange, children, className }: TActionMenuProps) => (
  <DropdownMenu open={open} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>
      <Button variant='ghost'>
        <BsThreeDots size={24} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='min-w-60'>
      <DropdownMenuLabel className='text-center'>Actions</DropdownMenuLabel>
      <div className={cn('flex flex-col gap-2', className?.childrenContainer)}>{children}</div>
    </DropdownMenuContent>
  </DropdownMenu>
);

type TActionMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: { childrenContainer?: string };
};
