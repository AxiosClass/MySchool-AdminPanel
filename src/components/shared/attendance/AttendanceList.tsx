import moment from 'moment';
import type { Moment } from 'moment';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, CircleCheckBigIcon, CircleXIcon } from 'lucide-react';
import { dateFormatString } from '@/data';
import { useGetStudentAttendance } from '@/hooks';
import { TAttendanceList, TAttendanceStatus } from '@/api/query';
import { Message } from '../Message';

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
      <Attendances attendances={attendanceData.attendances} month={date} />
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

type TAttendancesProps = Pick<TAttendanceList, 'attendances'> & { month: Moment };

export const Attendances = ({ attendances, month }: TAttendancesProps) => {
  const today = moment();

  const dateMap = useMemo(() => {
    return attendances.reduce<Record<string, TAttendanceStatus>>((acc, curr) => {
      acc[moment(curr.date).format(dateFormatString.basic)] = curr.status;
      return acc;
    }, {});
  }, [attendances]);

  const days = useMemo(() => {
    const start = month.clone().startOf('month').startOf('week');
    const end = month.clone().endOf('month').endOf('week');

    const temp: Moment[] = [];
    const current = start.clone();

    while (current.isSameOrBefore(end)) {
      temp.push(current.clone());
      current.add(1, 'day');
    }

    return temp;
  }, [month]);

  const getStatusIcon = (status?: TAttendanceStatus) => {
    const typeConfig = {
      PRESENT: {
        icon: <CircleCheckBigIcon className='size-4 text-primary' />,
        containerClass: 'bg-primary-50',
      },
      HOLIDAY: {
        icon: <CalendarDaysIcon className='size-4 text-blue-500' />,
        containerClass: 'bg-blue-50',
      },
      ABSENT: {
        icon: <CircleXIcon className='size-4 text-red-500' />,
        containerClass: 'bg-red-50',
      },
    };

    const config = status ? typeConfig[status] : null;

    if (!config) return null;

    return (
      <span className={cn('flex size-8 items-center justify-center rounded-full', config.containerClass)}>
        {config.icon}
      </span>
    );
  };

  return (
    <div className='overflow-hidden rounded-t-md'>
      {/* Weekday Headers */}
      <div className='grid grid-cols-7 gap-2 bg-muted p-4 text-center text-xs font-medium text-gray-600'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className='grid grid-cols-7 text-center'>
        {days.map((day) => {
          const key = day.format(dateFormatString.basic);
          const status = dateMap[key];
          const isCurrentMonth = day.month() === month.month();
          const isToday = day.isSame(today, 'day');

          return (
            <div
              key={key}
              className={cn(
                'flex h-24 flex-col items-center justify-center space-y-1 border p-2',
                isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400',
                isToday ? 'border-blue-500' : 'border-gray-200',
              )}
            >
              <div className='text-lg font-semibold'>{day.date()}</div>
              <div>{getStatusIcon(status)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
