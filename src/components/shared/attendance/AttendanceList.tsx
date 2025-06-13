import moment from 'moment';
import type { Moment } from 'moment';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, CircleCheckBigIcon, CircleXIcon } from 'lucide-react';
import { dateFormatString } from '@/data';
import { useGetStudentAttendance } from '@/hooks';
import { Message } from '../Message';
import { cn } from '@/lib/utils';

export const AttendanceList = ({ studentId, admittedAt }: { studentId: string; admittedAt: string }) => {
  const [date, setDate] = useState(moment().startOf('month'));
  const onDateChange = useCallback((date: Moment) => setDate(date), []);

  return (
    <Card className='bg-white'>
      <AttendanceHeader date={date} onDateChange={onDateChange} admittedAt={admittedAt} />
      <AttendanceFetcher studentId={studentId} date={date} />
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

type TAttendanceFetcherProps = { studentId: string; date: Moment };
const AttendanceFetcher = ({ studentId, date }: TAttendanceFetcherProps) => {
  const today = moment().endOf('day');
  const monthStart = date.clone().startOf('month');
  const monthEnd = date.clone().endOf('month');
  const end = monthEnd.isAfter(today) ? today : monthEnd;

  const { data: attendanceData, isLoading } = useGetStudentAttendance({
    studentId,
    start: monthStart.toISOString(),
    end: end.toISOString(),
  });

  const attendanceSummary = useMemo(() => {
    const initial = { present: 0, absent: 0, holiday: 0 };

    if (!attendanceData?.attendances) return initial;

    return attendanceData?.attendances?.reduce(
      (acc: { present: number; absent: number; holiday: number }, attendance) => {
        if (attendance.status === 'PRESENT') acc.present++;
        else if (attendance.status === 'HOLIDAY') acc.holiday++;
        else if (attendance.status === 'ABSENT') acc.absent++;

        return acc;
      },
      initial,
    );
  }, [attendanceData?.attendances]);

  if (isLoading) return null;
  if (!attendanceData) return <Message message='No Data Found' />;

  return (
    <CardContent className='space-y-6'>
      <AttendanceSummary {...attendanceSummary} />
    </CardContent>
  );
};

type TAttendanceSummaryProps = { present: number; absent: number; holiday: number };
const AttendanceSummary = ({ present, absent, holiday }: TAttendanceSummaryProps) => {
  const renderSummaryCard = useCallback((value: number, type: 'present' | 'absent' | 'holiday') => {
    const typeConfig = {
      present: { icon: <CircleCheckBigIcon className='size-6 text-primary' />, containerClass: 'bg-primary-50' },
      holiday: { icon: <CalendarDaysIcon className='size-6 text-blue-500' />, containerClass: 'bg-blue-50' },
      absent: { icon: <CircleXIcon className='size-6 text-red-500' />, containerClass: 'bg-red-50' },
    };

    const config = typeConfig[type];

    return (
      <Card className='w-full bg-transparent shadow-none'>
        <CardContent className='flex items-center gap-4 p-4'>
          <span className={cn('flex size-14 items-center justify-center rounded-full', config.containerClass)}>
            {config.icon}
          </span>
          <div className='space-y-1'>
            <h3 className='font-semibold capitalize'>{type}</h3>
            <h2 className='text-2xl font-semibold'>{value}</h2>
          </div>
        </CardContent>
      </Card>
    );
  }, []);

  return (
    <div className='flex items-center gap-4'>
      {renderSummaryCard(present, 'present')}
      {renderSummaryCard(holiday, 'holiday')}
      {renderSummaryCard(absent, 'absent')}
    </div>
  );
};
