import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';
import { Table, TableBody, TableHeader, TableRow } from '../ui/table';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export const CommonTable = ({
  head,
  children,
  header,
  tableContainerClassName,
  headerClassName,
  footer,
  footerClassName,
}: TCommonTableProps) => (
  <ScrollArea fixedLayout disableScrollbar className={cn(tableContainerClassName)}>
    <section className={cn('w-full overflow-hidden rounded-md border')}>
      {header && <section className={cn('border-b p-4', headerClassName)}>{header}</section>}
      <Table>
        <TableHeader>
          <TableRow className='border-none'>{head}</TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
      {footer && <section className={cn('', footerClassName)}>{footer}</section>}
    </section>
    <ScrollBar />
  </ScrollArea>
);

type TCommonTableProps = PropsWithChildren<{
  tableContainerClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  head: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}>;
