import { TableBodyLoader } from '@/components/loader';
import { CommonTable, PageHeader, PageTitle, TableNoData } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { UserIcon } from '@/components/shared/UserIcon';
import { useQuery } from '@tanstack/react-query';
import { getHolidays } from '@/api/query';
import { QK } from '@/api/queryKeys';
import { AddHoliday } from './AddHoliday';
import { DeleteHoliday } from './DeleteHoliday';

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

const HolidaysTable = () => (
  <CommonTable head={<HolidaysTableHeader />} tableContainerClassName='px-6'>
    <HolidaysTableBody />
  </CommonTable>
);

const HolidaysTableHeader = () => (
  <>
    <TableHead>Holiday name</TableHead>
    <TableHead>Start date</TableHead>
    <TableHead>End date</TableHead>
    <TableHead className='text-center'>Action</TableHead>
  </>
);

const HolidaysTableBody = () => {
  const { data: holidaysData, isLoading } = useQuery({
    queryKey: [QK.HOLIDAY],
    queryFn: getHolidays,
    select: (res) => res.data,
  });

  if (isLoading) return <TableBodyLoader cols={4} />;
  if (!holidaysData?.length) return <TableNoData colSpan={4} message='No holiday found' />;

  return holidaysData.map(({ id, name, description, startDate, endDate }) => (
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
      <TableCell>
        <div className='flex items-center justify-center'>
          <DeleteHoliday holidayId={id} />
        </div>
      </TableCell>
    </TableRow>
  ));
};
