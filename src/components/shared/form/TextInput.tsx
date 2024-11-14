import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';
import { Control } from 'react-hook-form';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  description?: string;
  name: string;
  label: string;
  className?: string;
}

export function TextInput({
  control,
  name,
  label,
  description,
  className,
  ...props
}: IProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel className='font-semibold'>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          {/* show error message */}
          <FormMessage />
          {/* if any description is provided */}
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
