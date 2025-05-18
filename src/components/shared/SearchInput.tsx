import { ComponentProps } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { SearchIcon, XIcon } from 'lucide-react';

type TSearchInputProps = ComponentProps<'input'> & { value: string; onSearchChange: (value: string) => void };

const SearchInput = ({ value, onSearchChange, className, ...props }: TSearchInputProps) => (
  <div className={cn('relative', className)}>
    <Input className={cn('px-10')} value={value} onChange={(e) => onSearchChange(e.target.value)} {...props} />
    <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-input' size={16} />
    <button
      className='absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-destructive'
      onClick={() => onSearchChange('')}
    >
      <XIcon size={16} />
    </button>
  </div>
);

export { SearchInput };
