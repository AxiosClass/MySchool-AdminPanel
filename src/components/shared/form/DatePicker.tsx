/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface IProps {
  label: string;
  name: string;
  control: Control<any>;
}

const currentYear = new Date().getFullYear();

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export function DatePicker({ label, name, control }: IProps) {
  const [isYearShown, setYearShown] = useState(false);
  const [isMothShown, setIsMonthShown] = useState(false);
  const [isDayShown, setIsDayShown] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='flex items-center gap-4'>
              <Popover open={isYearShown} onOpenChange={setYearShown}>
                <PopoverTrigger
                  className='w-full focus:border-primary focus:ring-1 focus:ring-primary'
                  asChild
                >
                  <Button variant={'outline'} className='w-full rounded-md'>
                    Year : {field.value?.getFullYear()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='bg-background p-0' align='start'>
                  <ScrollArea className='h-52 p-4'>
                    <div className='grid grid-cols-4 gap-2'>
                      {[...Array(80)].map((_, index) => (
                        <div
                          onClick={() => {
                            const date = new Date(field.value);
                            date.setFullYear(currentYear - index);
                            field.onChange(date);
                            setYearShown(false);
                          }}
                          className={cn(
                            'flex cursor-pointer justify-center rounded-md border p-1',
                            field.value.getFullYear() === currentYear - index &&
                              'bg-primary text-white',
                          )}
                          key={index}
                        >
                          {currentYear - index}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              <Popover open={isMothShown} onOpenChange={setIsMonthShown}>
                <PopoverTrigger
                  className='w-full focus:border-primary focus:ring-1 focus:ring-primary'
                  asChild
                >
                  <Button variant={'outline'} className='w-full rounded-md'>
                    Month : {months[field.value?.getMonth()]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='bg-background p-0' align='start'>
                  <ScrollArea className='max-h-52 p-4'>
                    <ScrollBar />
                    <div className='grid grid-cols-3 gap-2'>
                      {months.map((month, index) => (
                        <div
                          onClick={() => {
                            const date = new Date(field.value);
                            date.setMonth(index);
                            field.onChange(date);
                            setIsMonthShown(false);
                          }}
                          className={cn(
                            'flex cursor-pointer justify-center rounded-md border p-1',
                            field.value.getMonth() === index &&
                              'bg-primary text-white',
                          )}
                          key={index}
                        >
                          {month}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              <Popover open={isDayShown} onOpenChange={setIsDayShown}>
                <PopoverTrigger
                  className='w-full focus:border-primary focus:ring-1 focus:ring-primary'
                  asChild
                >
                  <Button variant={'outline'} className='w-full rounded-md'>
                    Day : {field.value.getDate()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='bg-background p-0' align='start'>
                  <ScrollArea className='max-h-56 p-4'>
                    <div className='grid grid-cols-7 gap-2'>
                      {[
                        ...Array(
                          new Date(
                            field.value.getFullYear(),
                            field.value.getMonth() + 1,
                            0,
                          ).getDate(),
                        ),
                      ].map((_, index) => (
                        <div
                          onClick={() => {
                            const date = new Date(field.value);
                            date.setDate(index + 1);
                            field.onChange(date);
                            setIsDayShown(false);
                          }}
                          className={cn(
                            'flex cursor-pointer justify-center rounded-md border p-1',
                            field.value.getDate() === index + 1 &&
                              'bg-primary text-white',
                          )}
                          key={index}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
