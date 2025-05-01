import { CommonTable, Message, TooltipContainer, UserIcon } from '@/components/shared';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import type { TGetAttendanceQueryResult } from '.';
import { cn } from '@/lib/utils';

export const AttendanceTable = ({ attendanceList }: TAttendanceTableProps) => {
  if (!attendanceList.length) return <Message message='No Attendance Found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Student Info</TableHead>
          <TableHead>Attendances</TableHead>
          <TableHead>Action</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      {attendanceList.map(({ id, name, attendances }) => (
        <TableRow key={id}>
          <TableCell>
            <div className='flex items-center gap-4'>
              <UserIcon username={name} />
              <div>
                <h1 className='text-lg font-semibold'>{name}</h1>
                <p className='text-sm text-muted-foreground'>#{id}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <AttendanceGrid attendances={attendances} />
          </TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};

const CONFIG = {
  PRESENT: 'bg-primary',
  ABSENT: 'border bg-primary-100',
  HOLIDAY: 'bg-gray-700',
};

const AttendanceGrid = ({ attendances }: TAttendanceGridProps) => {
  return (
    <div className='flex gap-1'>
      {attendances.map(({ date, status }) => {
        const config = CONFIG[status];
        return (
          <TooltipContainer label={date}>
            <div key={date} className={cn('size-5 rounded-sm', config)} />
          </TooltipContainer>
        );
      })}
    </div>
  );
};

const AddOrRemoveAttendance = () => {};

// types
type TAttendanceTableProps = { attendanceList: NonNullable<TGetAttendanceQueryResult['data']>['attendanceList'] };
type TAttendanceGridProps = Pick<TAttendanceTableProps['attendanceList'][number], 'attendances'>;
