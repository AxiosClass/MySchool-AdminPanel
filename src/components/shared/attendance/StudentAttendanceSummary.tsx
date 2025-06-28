import { QK } from '@/api';
import { getAttendanceSummaryForStudent } from '@/api/query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { CommonSelect } from '../form';

type TUnit = 'count' | 'percentage';

export const StudentAttendanceSummary = ({ studentId }: { studentId: string }) => {
  const [unit, setUnit] = useState<TUnit>('count');
  const onUnitChange = useCallback((v: string) => setUnit(v as TUnit), []);

  const { data: attendanceSummary, isLoading } = useQuery({
    queryKey: [QK.ATTENDANCE, 'SUMMARY', { studentId }],
    queryFn: () => getAttendanceSummaryForStudent(studentId),
    select: (res) => res.data,
    enabled: !!studentId,
  });

  if (isLoading) return null;
  if (!attendanceSummary) return null;

  const total = attendanceSummary.totalPresent + attendanceSummary.totalAbsent;

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between gap-4'>
        <CardTitle className='text-xl font-semibold'>Attendance Summary</CardTitle>
        <UnitSelection unit={unit} onUnitChange={onUnitChange} />
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4 md:flex-row'>
        <ProgressBar
          title='Present'
          total={total}
          value={attendanceSummary.totalPresent}
          variant='present'
          unit={unit}
        />
        <ProgressBar
          title='Absent'
          total={total}
          value={attendanceSummary.totalAbsent}
          variant='absent'
          unit={unit}
        />
      </CardContent>
    </Card>
  );
};

type TUnitSelectionProps = { unit: TUnit; onUnitChange: (unit: string) => void };
const UnitSelection = ({ unit, onUnitChange }: TUnitSelectionProps) => (
  <CommonSelect
    className='max-w-40'
    value={unit}
    onChange={onUnitChange}
    options={[
      { label: 'Count', value: 'count' },
      { label: 'Percentage', value: 'percentage' },
    ]}
  />
);

type TProgressBarProps = {
  title: string;
  total: number;
  value: number;
  variant: 'present' | 'absent';
  unit: TUnit;
};
const ProgressBar = ({ title, total, value, variant, unit }: TProgressBarProps) => {
  const safeTotal = total === 0 ? 1 : total;
  const safeValue = Math.min(Math.max(value, 0), safeTotal);
  const percentage = (safeValue * 100) / safeTotal;

  const content =
    unit === 'percentage' ? (
      `${percentage.toFixed(1)} %`
    ) : (
      <span>
        {safeValue} / <span className='text-sm text-muted-foreground'>{total}</span>
      </span>
    );

  return (
    <Card className='w-full border-none shadow-none'>
      <CardHeader className='flex-row items-center justify-between pb-1 text-base font-semibold'>
        <CardTitle className=''>{title}</CardTitle>
        {content}
      </CardHeader>
      <CardContent className='p-3'>
        <div className='rounded-full bg-muted-foreground/30'>
          <div
            data-variant={variant}
            style={{ width: `${(value / total) * 100}%` }}
            className='h-2 rounded-full data-[variant=absent]:bg-destructive data-[variant=present]:bg-primary-500'
          />
        </div>
      </CardContent>
    </Card>
  );
};
