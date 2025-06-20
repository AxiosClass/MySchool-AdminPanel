import { YearPicker } from '@/components/shared/result-summary';
import { PageWithTableLoader } from '@/components/loader';
import { PageHeader, PageTitle } from '@/components/shared';
import { useGetStudentInfo } from '@/hooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/stores/auth';
import { useCallback, useState } from 'react';
import { getYearsFromDateToNow } from '@/helpers';
import { TermSummaryFetcher } from '@/components/shared/result-summary/TermSummaryFetcher';

export default function StudentResultPage() {
  const studentId = useAuthStore((state) => state.user?.id as string);
  const { data: studentInfo, isLoading } = useGetStudentInfo(studentId);

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const onYearChange = useCallback((year: string) => setYear(year), []);

  if (isLoading) return <PageWithTableLoader />;
  if (!studentInfo) return null;

  const years = getYearsFromDateToNow(studentInfo.admittedAt);

  return (
    <>
      <PageTitle title='Results' />
      <ScrollArea>
        <PageHeader childContainerClassName='w-full' label={`Result of Academic Year : ${year}`}>
          <YearPicker year={year} onYearChange={onYearChange} years={years} />
        </PageHeader>
        <TermSummaryFetcher studentId={studentId} year={year} />
        <div className='mb-6' />
      </ScrollArea>
    </>
  );
}
