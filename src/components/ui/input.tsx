import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export type TProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, TProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'h-input flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    const [isShown, setIsShown] = React.useState(false);

    return (
      <div className='flex items-center overflow-hidden rounded-md border border-input focus-within:ring-1 focus-within:ring-ring'>
        <input
          type={isShown ? 'text' : 'password'}
          className={cn(
            'h-input flex w-full bg-transparent px-3 py-1 text-base shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        <button
          onClick={() => setIsShown((prev) => !prev)}
          type='button'
          className='h-input rounded-r-md px-3 hover:bg-primary/50'
        >
          {isShown ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { Input };
