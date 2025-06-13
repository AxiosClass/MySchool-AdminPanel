import moment from 'moment';
import type { Moment } from 'moment';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { dateFormatString } from '@/data';

export const AttendanceList = ({ studentId, admittedAt }: { studentId: string; admittedAt: string }) => {
  const [date, setDate] = useState(moment().startOf('month'));
  const onDateChange = useCallback((date: Moment) => setDate(date), []);

  return (
    <Card className='bg-white'>
      <AttendanceHeader date={date} onDateChange={onDateChange} admittedAt={admittedAt} />
    </Card>
  );
};

type TAttendanceHeaderProps = { date: Moment; onDateChange: (date: Moment) => void; admittedAt: string };
const AttendanceHeader = ({ date, admittedAt, onDateChange }: TAttendanceHeaderProps) => {
  const min = moment(admittedAt).startOf('month');
  const max = moment().startOf('month');

  const canGoNext = date.isBefore(max);
  const canGoPrev = date.isAfter(min);

  const goNext = () => onDateChange(moment(date).add(1, 'month'));
  const goPrevious = () => onDateChange(moment(date).subtract(1, 'month'));

  return (
    <CardHeader className='flex-row items-center justify-between'>
      <CardTitle className='text-xl'>Attendance Record</CardTitle>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' onClick={goPrevious} disabled={!canGoPrev}>
          <ChevronLeftIcon className='size-4' />
        </Button>
        <span className='text-base font-semibold'>{date.format(dateFormatString.month)}</span>
        <Button variant='outline' size='icon' onClick={goNext} disabled={!canGoNext}>
          <ChevronRightIcon className='size-4' />
        </Button>
      </div>
    </CardHeader>
  );
};
