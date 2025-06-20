import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader } from '../loader';
import { PenLineIcon, PlusIcon, TrashIcon } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 gap-2 shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'primary-ghost': 'hover:bg-primary hover:text-white',
        'destructive-ghost': 'hover:bg-destructive hover:text-white text-destructive',
        'destructive-outline': 'border border-destructive text-destructive shadow-sm hover:bg-destructive/90',
      },
      size: {
        default: 'h-input px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-8',
      },
      rounded: {
        full: 'rounded-full',
        default: 'rounded-md',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild = false, isLoading = false, disabled = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const content = (
      <>
        {isLoading && <Loader className='w-fit' />} {children}
      </>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
      >
        {asChild ? children : content}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

type TActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  actionType: 'ADD' | 'UPDATE' | 'DELETE';
};

type TActionButtonConfig = {
  [key: string]: { icon: React.ReactNode; className?: string; variant?: 'primary-ghost' | 'destructive-ghost' };
};

const ACTION_BUTTON_CONFIG: TActionButtonConfig = {
  ADD: { icon: <PlusIcon className='size-4' /> },
  UPDATE: { icon: <PenLineIcon className='size-4' />, className: 'justify-start', variant: 'primary-ghost' },

  DELETE: {
    icon: <TrashIcon className='size-4' />,
    className: 'justify-start text-foreground',
    variant: 'destructive-ghost',
  },
};

const ActionButton = React.forwardRef<HTMLButtonElement, TActionButtonProps>(
  ({ label, actionType, className, ...props }, ref) => {
    const config = ACTION_BUTTON_CONFIG[actionType];

    return (
      <Button ref={ref} {...props} className={cn(config.className, className)} variant={config.variant || 'default'}>
        {config.icon} {label}
      </Button>
    );
  },
);

ActionButton.displayName = 'ActionButton';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants, ActionButton };
