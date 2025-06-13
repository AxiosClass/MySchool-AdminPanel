import { PageWithTableLoader, TableLoader } from '@/components/loader';
import { Message, PageHeader, PageTitle } from '@/components/shared';
import { TermSummaryTable, YearPicker } from '@/components/shared/result-summary';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getYearsFromDateToNow } from '@/helpers';
import { useGetStudentInfo, useGetTermResultSummary } from '@/hooks';
import { useAuthStore } from '@/stores/auth';
import { useCallback, useState } from 'react';

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

type TTermSummaryFetcher = { studentId: string; year: string };

const TermSummaryFetcher = ({ studentId, year }: TTermSummaryFetcher) => {
  const { data: termResults, isPending } = useGetTermResultSummary(studentId, year);

  if (isPending) return <TableLoader />;
  if (!termResults?.length) return <Message message='No Term Found!' />;

  return (
    <div className='flex flex-col gap-2'>
      {termResults.map((termResult) => (
        <TermSummaryTable key={termResult.termId} {...termResult} />
      ))}
    </div>
  );
};
