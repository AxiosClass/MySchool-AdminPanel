'use client';

import moment from 'moment';
import type { Moment } from 'moment';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { dateFormatString } from '@/data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TDatePickerProps = {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

const weekdays = moment.weekdaysShort();
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - 49 + i);
const months = moment.months();

export const DatePicker = ({ value, onChange, minDate, maxDate, className }: TDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => moment(value));
  const [selectedDate, setSelectedDate] = useState(() => moment(value));

  const onMonthChange = useCallback((value: Moment) => setCurrentMonth(value), []);

  useEffect(() => {
    const newDate = moment(value);
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
  }, [value]);

  const isDisabled = (date: Moment) => {
    if (minDate && date.isBefore(moment(minDate), 'day')) return true;
    if (maxDate && date.isAfter(moment(maxDate), 'day')) return true;
    return false;
  };

  const handleSelectDate = (date: Moment) => {
    if (!isDisabled(date)) {
      setSelectedDate(date);
      onChange(date.toDate());
      setIsOpen(false);
    }
  };

  const days = useMemo(() => {
    const daysInMonth = currentMonth.daysInMonth();
    const startOfMonth = currentMonth.clone().startOf('month').day();
    const result: (Moment | null)[] = Array(startOfMonth).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      result.push(currentMonth.clone().date(d));
    }

    return result;
  }, [currentMonth]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className={cn('flex w-full justify-start border-border', className)}
        >
          {value ? (
            selectedDate.format(dateFormatString.basic)
          ) : (
            <p className='font-normal text-muted-foreground'>Pick a date</p>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align='center' className='rounded-md border border-gray-200 bg-white p-4'>
        <DatePickerControl currentMonth={currentMonth} onMonthChange={onMonthChange} />

        <div className='mt-4 grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground'>
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className='mt-1 grid grid-cols-7 gap-1'>
          {days.map((date, idx) => {
            const isSelected = date?.isSame(selectedDate, 'day');
            const isToday = date?.isSame(currentMonth.date(), 'day');
            const disabled = date && isDisabled(date);

            return (
              <button
                type='button'
                key={idx}
                disabled={!!(!date || disabled)}
                onClick={() => date && handleSelectDate(date)}
                className={cn(
                  'size-10 rounded text-sm transition-all',
                  date ? 'hover:bg-gray-100' : '',
                  isSelected && 'bg-primary text-white hover:bg-primary/70',
                  disabled && 'cursor-not-allowed text-gray-400',
                  isToday && 'bg-blue-300',
                )}
              >
                {date ? date.date() : ''}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

type TDatePickerControlProps = { currentMonth: Moment; onMonthChange: (value: Moment) => void };

const DatePickerControl = ({ currentMonth, onMonthChange }: TDatePickerControlProps) => {
  const handleMonthChange = (value: string) => {
    onMonthChange(currentMonth.clone().month(value));
  };

  const handleYearChange = (value: string) => {
    onMonthChange(currentMonth.clone().year(Number(value)));
  };

  const goPrevious = () => {
    onMonthChange(currentMonth.clone().subtract(1, 'month'));
  };

  const goNext = () => {
    onMonthChange(currentMonth.clone().add(1, 'month'));
  };

  return (
    <div className='mb-2 flex items-center justify-between'>
      <button type='button' onClick={goPrevious} className='rounded p-1 hover:bg-gray-100'>
        <ChevronLeftIcon />
      </button>

      <div className='flex items-center gap-2'>
        <Select value={currentMonth.month().toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className='w-20'>
            <SelectValue placeholder='Pick Month' />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, idx) => (
              <SelectItem key={idx} value={idx.toString()}>
                <span className='text-xs font-semibold uppercase'> {month.slice(0, 3)}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span> : </span>

        <Select value={currentMonth.year().toString()} onValueChange={handleYearChange}>
          <SelectTrigger className='w-20'>
            <SelectValue placeholder='Pick Year' />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                <span className='text-xs font-semibold'>{year}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button type='button' onClick={goNext} className='rounded p-1 hover:bg-gray-100'>
        <ChevronRightIcon />
      </button>
    </div>
  );
};
