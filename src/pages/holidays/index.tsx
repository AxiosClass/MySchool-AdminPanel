import { TableLoader } from '@/components/loader';
import { CommonTable, Message, PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { UserIcon } from '@/components/shared/UserIcon';
import { useQuery } from '@tanstack/react-query';
import { getHolidays } from '@/api/query';
import { QK } from '@/api/queryKeys';
import { AddHoliday } from './AddHoliday';
import { useMemo } from 'react';

export default function HolidaysPage() {
  return (
    <>
      <PageTitle title='Holidays' />
      <ScrollArea>
        <PageHeader label='Holidays'>
          <AddHoliday />
        </PageHeader>
        <HolidaysTable />
      </ScrollArea>
    </>
  );
}

const HolidaysTable = () => {
  const { data: holidaysData, isLoading } = useQuery({
    queryKey: [QK.HOLIDAY],
    queryFn: getHolidays,
    select: (res) => res.data,
  });

  const tableHead = useMemo(() => {
    return (
      <>
        <TableHead>Holiday name</TableHead>
        <TableHead>Start date</TableHead>
        <TableHead>End date</TableHead>
      </>
    );
  }, []);

  if (isLoading) return <TableLoader />;
  if (!holidaysData?.length) return <Message message='No holiday Found' />;

  return (
    <CommonTable head={tableHead} tableContainerClassName='px-6'>
      {holidaysData.map(({ id, name, description, startDate, endDate }) => (
        <TableRow className='border-b' key={id}>
          <TableCell>
            <div className='flex gap-4'>
              <UserIcon username={name} />
              <div>
                <p className='text-base font-semibold'>{name}</p>
                <p className='text-sm text-muted-foreground'>{description || 'No description'}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>{new Date(startDate).toDateString()}</TableCell>
          <TableCell>{new Date(endDate).toDateString()}</TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};
