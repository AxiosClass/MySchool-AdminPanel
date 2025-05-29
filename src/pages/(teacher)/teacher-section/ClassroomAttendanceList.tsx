import moment from 'moment';

import { QK } from '@/api';
import { useCallback, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, UsersIcon } from 'lucide-react';
import { dateFormatString } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAttendancesForClassroom } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { AttendanceCard } from './AttendanceCard';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ClassroomAttendanceList = ({ sectionId }: { sectionId: string }) => {
  const user = useAuthStore((state) => state.user);

  const [date, setDate] = useState(new Date());
  const formattedDate = moment(date).format(dateFormatString.isoBasic);

  const { data: attendanceInfo, isLoading } = useQuery({
    queryKey: [QK.ATTENDANCE, { sectionId, date: formattedDate }],
    queryFn: () => getAttendancesForClassroom({ classroomId: sectionId, date: formattedDate }),
    select: (res) => res.data,
  });

  const onDateChange = useCallback((date: Date) => setDate(date), []);

  if (isLoading) return <AttendanceLoader />;

  return (
    <section className='flex flex-col gap-6'>
      <DateController date={date} onDateChange={onDateChange} />
      <section className='flex items-center gap-4'>
        <SummaryCard label='Total Students' value={attendanceInfo?.totalStudents || 0} />
        <SummaryCard label='Total Present' value={attendanceInfo?.totalPresent || 0} />
      </section>

      <section className='flex flex-col gap-4'>
        {attendanceInfo?.attendanceList.map((attendance) => (
          <AttendanceCard
            key={attendance.studentId}
            isClassTeacher={user?.id === attendanceInfo.classTeacherId}
            {...attendance}
          />
        ))}
      </section>
    </section>
  );
};

type TDateControllerProps = { date: Date; onDateChange: (date: Date) => void };
const DateController = ({ date, onDateChange }: TDateControllerProps) => {
  const formattedDate = moment(date).format(dateFormatString.basic);
  const now = new Date();

  const isToday = moment(date).isSame(now, 'day');

  const goNext = () => {
    if (isToday) return;
    onDateChange(moment(date).add(1, 'day').toDate());
  };

  const goPrevious = () => {
    onDateChange(moment(date).subtract(1, 'day').toDate());
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between gap-4'>
        <Button variant='outline' size='icon' onClick={goPrevious}>
          <ChevronLeftIcon size={16} />
        </Button>
        <CardTitle className='font-bold'>{formattedDate}</CardTitle>
        <Button variant='outline' size='icon' onClick={goNext} disabled={isToday}>
          <ChevronRightIcon size={16} />
        </Button>
      </CardHeader>
    </Card>
  );
};

type TSummaryCardProps = { label: string; value: number };

const SummaryCard = ({ label, value }: TSummaryCardProps) => (
  <Card className='grow'>
    <CardHeader>
      <CardTitle className='text-lg font-semibold'>{label}</CardTitle>
    </CardHeader>
    <CardContent className='flex items-center justify-between gap-4'>
      <h2 className='text-2xl font-bold'>{value}</h2>
      <UsersIcon size={20} />
    </CardContent>
  </Card>
);

const AttendanceLoader = () => (
  <div className='flex w-full flex-col gap-4'>
    <div className='flex items-center justify-between gap-4 rounded-md border border-gray-200 p-4'>
      <Skeleton className='h-8 w-10' />
      <Skeleton className='h-10 w-40' />
      <Skeleton className='h-8 w-10' />
    </div>
    <div className='flex items-center gap-4'>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className='grow rounded-md border border-gray-200 p-4'>
          <Skeleton className='h-4 w-40' />
          <div className='mt-2 flex items-center justify-between'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='size-6' />
          </div>
        </div>
      ))}
    </div>
    <div className='mt-2 flex flex-col gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='flex items-center gap-4 rounded-md border border-gray-200 p-4'>
          <Skeleton className='size-10 rounded-full' />
          <div className=''>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='mt-2 h-4 w-40' />
          </div>
          <div className='ml-auto h-8 border-l border-gray-200' />
          <Skeleton className='h-6 w-12' />
        </div>
      ))}
    </div>
  </div>
);
