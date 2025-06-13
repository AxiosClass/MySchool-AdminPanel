import { TTermResultSummaryResult } from '@/api/query';
import { CommonTable } from '../CommonTable';
import { useMemo } from 'react';
import { TableHead } from '@/components/ui/table';

type TTermSummaryTableProps = TTermResultSummaryResult[number];

export const TermSummaryTable = ({ termName }: TTermSummaryTableProps) => {
  const header = useMemo(() => {
    return (
      <div className='flex items-center justify-center bg-muted/50 p-4'>
        <h2>{termName}</h2>
      </div>
    );
  }, [termName]);

  const tableHead = useMemo(() => {
    return (
      <>
        <TableHead>Subject</TableHead>
      </>
    );
  }, []);

  return <CommonTable header={header} head={tableHead} tableContainerClassName='px-6'></CommonTable>;
};
