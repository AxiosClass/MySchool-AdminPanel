import * as customForm from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';
import { useState } from 'react';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
}

export const PasswordInput = ({ form, name, label, description }: IProps) => {
  const [isShown, setIsShown] = useState(false);

  const onToggle = () => {
    setIsShown((prev) => !prev);
  };

  return (
    <customForm.FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <customForm.FormItem className='w-full'>
          <customForm.FormLabel className='font-semibold'>
            {label}
          </customForm.FormLabel>
          <customForm.FormControl>
            <div className='relative'>
              <Input
                placeholder={'*******'}
                type={isShown ? 'text' : 'password'}
                {...field}
              />
              <div
                onClick={onToggle}
                className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
              >
                {isShown ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
          </customForm.FormControl>
          {/* show error message */}
          <customForm.FormMessage />

          {/* if any description is provided */}
          {description && (
            <customForm.FormDescription>
              {description}
            </customForm.FormDescription>
          )}
        </customForm.FormItem>
      )}
    />
  );
};
