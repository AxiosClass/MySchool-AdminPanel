import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { InputHTMLAttributes, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  description?: string;
  name: string;
  label: string;
}

export function PasswordInput({ control, name, label, description, ...props }: IProps) {
  const [isShown, setIsShown] = useState(false);

  const onToggle = () => {
    setIsShown((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel className='font-semibold'>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Input placeholder={'*******'} type={isShown ? 'text' : 'password'} {...field} {...props} />
              <div onClick={onToggle} className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'>
                {isShown ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
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
