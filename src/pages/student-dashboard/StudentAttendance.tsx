import moment from 'moment';

import { QK } from '@/api';
import { CommonSelect } from '@/components/shared/form';
import { useCallback, useState } from 'react';
import { dateFormatString } from '@/data';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
import { getAttendancesForStudent } from '@/api/query';
import { cn } from '@/lib/utils';

// Const
const timePeriodOptions = [
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'This Year', value: 'this_year' },
];

// Main Component
export const StudentAttendance = () => {
  const [range, setRange] = useState(timePeriodOptions[0].value);
  const rangeChange = useCallback((value: string) => setRange(value), []);

  return (
    <div className='mb-6 mt-12 rounded-md'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Attendances</h2>
        <CommonSelect className='max-w-52' value={range} onChange={rangeChange} options={timePeriodOptions} />
      </div>
      <AttendanceList range={range} />
    </div>
  );
};

const AttendanceList = ({ range }: TAttendanceListProps) => {
  const { data: attendanceList } = useGetAttendancesForStudent(range);

  return (
    <div className='grid grid-cols-10 gap-4'>
      {attendanceList?.attendances.map((attendance) => (
        <AttendanceCard key={attendance.attendanceId} {...attendance} />
      ))}
    </div>
  );
};

const statusConfig: Record<string, { label: string; className: string }> = {
  PRESENT: { label: 'Present', className: 'bg-primary' },
  ABSENT: { label: 'Absent', className: 'bg-amber-700' },
  HOLIDAY: { label: 'Off Day', className: 'bg-gray-700' },
};

const AttendanceCard = ({ date, status }: TAttendanceCardProps) => {
  const config = statusConfig[status];

  return (
    <div className={cn('flex flex-col gap-1 rounded-md p-4 text-center text-white shadow-sm', config?.className)}>
      <p className='font-semibold'>{moment(date).format('ddd')}</p>
      <p className='font-semibold'>{moment(date).format('Do MMM')}</p>
      <h2 className='mt-2 text-xl font-semibold'>{config?.label}</h2>
    </div>
  );
};

// Hooks
const useGetAttendancesForStudent = (range: string) => {
  const user = useAuthStore((state) => state.user);
  const timeRange = generateTimeRange(range);

  return useQuery({
    queryKey: [QK.ATTENDANCE, { studentId: user?.id, ...timeRange }],
    enabled: !!user?.id,
    queryFn: () => getAttendancesForStudent(timeRange),
    select: (res) => res.data,
  });
};

// Functions
const generateTimeRange = (option: string) => {
  const date = new Date();
  const dateStr = dateFormatString.isoBasic;

  switch (option) {
    case 'last_30_days':
      return {
        start: moment(date).subtract(29, 'day').startOf('day').format(dateStr),
        end: moment(date).endOf('day').format(dateStr),
      };

    case 'this_month':
      return {
        start: moment(date).startOf('month').startOf('day').format(dateStr),
        end: moment(date).endOf('day').format(dateStr),
      };

    case 'last_month':
      return {
        start: moment(date).subtract(1, 'month').startOf('month').startOf('day').format(dateStr),
        end: moment(date).subtract(1, 'month').endOf('month').endOf('day').format(dateStr),
      };

    case 'this_year':
      return {
        start: moment(date).startOf('year').startOf('day').format(dateStr),
        end: moment(date).endOf('day').format(dateStr),
      };

    default:
      return {
        start: moment(date).startOf('month').startOf('day').format(dateStr),
        end: moment(date).endOf('month').endOf('day').format(dateStr),
      };
  }
};

// Types
type TAttendanceListProps = { range: string };
type TAttendanceCardProps = TAttendance;

type TQueryResult = ReturnType<typeof useGetAttendancesForStudent>;
type TAttendance = NonNullable<TQueryResult['data']>['attendances'][number];
