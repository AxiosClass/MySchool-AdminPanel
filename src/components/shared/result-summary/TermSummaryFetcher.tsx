import { TableLoader } from '@/components/loader';
import { useGetTermResultSummary } from '@/hooks';
import { Message } from '../Message';
import { TermSummaryTable } from './TermSummaryTable';

type TTermSummaryFetcherProps = {
  studentId: string;
  year: string;
  tableContainerClass?: string;
  tableHeaderClass?: string;
};

export const TermSummaryFetcher = ({
  studentId,
  year,
  tableContainerClass,
  tableHeaderClass,
}: TTermSummaryFetcherProps) => {
  const { data: termResults, isPending } = useGetTermResultSummary(studentId, year);

  if (isPending) return <TableLoader />;
  if (!termResults?.length) return <Message message='No term found for this student' className='my-6' />;

  return (
    <div className='flex flex-col gap-2'>
      {termResults.map((termResult) => (
        <TermSummaryTable
          key={termResult.termId}
          tableContainerClass={tableContainerClass}
          tableHeaderClass={tableHeaderClass}
          {...termResult}
        />
      ))}
    </div>
  );
};
