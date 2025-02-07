import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';
import { Table, TableBody, TableHeader, TableRow } from '../ui/table';

type TCommonTableProps = PropsWithChildren<{ className?: { tableContainer?: string }; head: ReactNode }>;
export const CommonTable = ({ head, children, className }: TCommonTableProps) => {
  return (
    <section className={cn('w-full overflow-hidden rounded-md border', className?.tableContainer)}>
      <Table>
        <TableHeader>
          <TableRow className='border-none'>{head}</TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </section>
  );
};
