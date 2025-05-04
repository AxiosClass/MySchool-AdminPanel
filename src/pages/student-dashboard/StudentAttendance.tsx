// Main Component

import { CommonSelect } from '@/components/shared/form';
import { useCallback, useState } from 'react';

// Const
const timePeriodOptions = [
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'This Year', value: 'this_year' },
];

export const StudentAttendance = () => {
  const [range, setRange] = useState(timePeriodOptions[0].value);
  const rangeChange = useCallback((value: string) => setRange(value), []);

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
const useGetAttendancesForStudent = () => {};
