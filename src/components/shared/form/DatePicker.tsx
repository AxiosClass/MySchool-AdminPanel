import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReactNode, useState } from 'react';

// Main component
export const DatePicker = ({ value, onChange }: TDatePickerProps) => {
  const [isYearShown, setYearShown] = useState(false);
  const [isMonthShown, setIsMonthShown] = useState(false);
  const [isDayShown, setIsDayShown] = useState(false);

  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();

  const updateDate = (part: 'year' | 'month' | 'day', newValue: number) => {
    const newDate = new Date(value);
    switch (part) {
      case 'year':
        newDate.setFullYear(newValue);
        break;
      case 'month':
        newDate.setMonth(newValue);
        break;
      case 'day':
        newDate.setDate(newValue);
        break;
    }
    onChange(newDate);
  };

  return (
    <div className='flex items-center gap-4'>
      <DatePartPicker
        isOpen={isYearShown}
        onOpenChange={setYearShown}
        label='Year'
        displayValue={value.getFullYear()}
        value={value}
        onChange={onChange}
      >
        <div className='grid grid-cols-4 gap-2'>
          {[...Array(YEARS_TO_SHOW)].map((_, index) => {
            const year = currentYear - index;
            return (
              <div
                key={year}
                onClick={() => {
                  updateDate('year', year);
                  setYearShown(false);
                }}
                className={cn(
                  'flex cursor-pointer justify-center rounded-md border p-1',
                  value.getFullYear() === year && 'bg-primary text-white',
                )}
              >
                {year}
              </div>
            );
          })}
        </div>
      </DatePartPicker>

      <DatePartPicker
        isOpen={isMonthShown}
        onOpenChange={setIsMonthShown}
        label='Month'
        displayValue={MONTHS[value.getMonth()]}
        value={value}
        onChange={onChange}
      >
        <div className='grid grid-cols-3 gap-2'>
          {MONTHS.map((month, index) => (
            <div
              key={month}
              onClick={() => {
                updateDate('month', index);
                setIsMonthShown(false);
              }}
              className={cn(
                'flex cursor-pointer justify-center rounded-md border p-1',
                value.getMonth() === index && 'bg-primary text-white',
              )}
            >
              {month}
            </div>
          ))}
        </div>
      </DatePartPicker>

      <DatePartPicker
        isOpen={isDayShown}
        onOpenChange={setIsDayShown}
        label='Day'
        displayValue={value.getDate()}
        value={value}
        onChange={onChange}
      >
        <div className='grid grid-cols-7 gap-2'>
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            return (
              <div
                key={day}
                onClick={() => {
                  updateDate('day', day);
                  setIsDayShown(false);
                }}
                className={cn(
                  'flex cursor-pointer justify-center rounded-md border p-1',
                  value.getDate() === day && 'bg-primary text-white',
                )}
              >
                {day}
              </div>
            );
          })}
        </div>
      </DatePartPicker>
    </div>
  );
};

// Reusable date part picker component
const DatePartPicker = ({ isOpen, onOpenChange, label, displayValue, children }: TDatePartPickerProps) => (
  <Popover open={isOpen} onOpenChange={onOpenChange}>
    <PopoverTrigger className='w-full focus:border-primary focus:ring-1 focus:ring-primary' asChild>
      <Button variant='outline' className='w-full justify-start rounded-md'>
        {label} : {displayValue}
      </Button>
    </PopoverTrigger>
    <PopoverContent className='bg-background p-0' align='start' onWheel={(e) => e.stopPropagation()}>
      <ScrollArea className='p-4'>
        <div className='max-h-52'>{children}</div>
      </ScrollArea>
    </PopoverContent>
  </Popover>
);

// consts
const YEARS_TO_SHOW = 80;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// Types
type TDatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

type TDatePartPickerProps = TDatePickerProps & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  displayValue: string | number;
  children?: ReactNode;
};
