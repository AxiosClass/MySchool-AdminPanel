import { PageHeader, PageTitle } from '@/components/shared';
import { YearPicker } from '@/components/shared/result-summary/year-picker';
import { getYearsFromDateToNow } from '@/helpers';
import { useGetStudentInfo } from '@/hooks';
import { useAuthStore } from '@/stores/auth';
import { useCallback, useState } from 'react';

export default function StudentResultPage() {
  const studentId = useAuthStore((state) => state.user?.id);
  const { data: studentInfo, isLoading } = useGetStudentInfo(studentId as string);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const onYearChange = useCallback((year: string) => setYear(year), []);

  if (isLoading) return null;
  if (!studentInfo) return null;

  const years = getYearsFromDateToNow(studentInfo.admittedAt);

  return (
    <>
      <PageTitle title='Results' />
      <PageHeader childContainerClassName='w-full' label='Academic Year'>
        <YearPicker year={year} onYearChange={onYearChange} years={years} />
      </PageHeader>
    </>
  );
}
