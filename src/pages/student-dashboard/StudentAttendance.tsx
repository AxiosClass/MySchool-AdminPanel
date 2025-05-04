import moment from 'moment';

import { CommonSelect } from '@/components/shared/form';
import { useCallback, useState } from 'react';
import { dateFormatString } from '@/data';

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

  useGetAttendancesForStudent(range);

  return (
    <div className='mt-12 rounded-md border p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Attendances</h2>
        <CommonSelect className='max-w-52' value={range} onChange={rangeChange} options={timePeriodOptions} />
      </div>
    </div>
  );
};

// Hooks
const useGetAttendancesForStudent = (range: string) => {
  const timeRange = generateTimeRange(range);
  console.log(timeRange);
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
        end: moment(date).endOf('month').endOf('day').format(dateStr),
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
  }
};
