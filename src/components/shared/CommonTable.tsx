import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';
import { Table, TableBody, TableHeader, TableRow } from '../ui/table';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export const CommonTable = ({ head, children, className }: TCommonTableProps) => {
  return (
    <ScrollArea fixedLayout disableScrollbar className={cn(className?.tableContainer)}>
      <section className={cn('w-full overflow-hidden rounded-md border')}>
        <Table>
          <TableHeader>
            <TableRow className='border-none'>{head}</TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </section>
      <ScrollBar />
    </ScrollArea>
  );
};

type TCommonTableProps = PropsWithChildren<{ className?: { tableContainer?: string }; head: ReactNode }>;
