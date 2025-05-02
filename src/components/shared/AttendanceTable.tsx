import moment from 'moment';

import type { TGetAttendanceQueryResult } from '../../pages/teacher-classroom';
import { CommonTable, Message, TooltipContainer, UserIcon } from '@/components/shared';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAttendance, deleteAttendance } from '@/api/query';
import { toast } from 'sonner';
import { MdError } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { QK } from '@/api';
import { errorMessageGen } from '@/helpers';
import { Loader } from '../ui/loader';

export const AttendanceTable = ({ attendanceList }: TAttendanceTableProps) => {
  if (!attendanceList.length) return <Message message='No Attendance Found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Student Info</TableHead>
          <TableHead>Attendances</TableHead>
          <TableHead className='text-center'>Action</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      {attendanceList.map(({ id, name, attendances }) => {
        const todaysAttendance = getTodaysAttendance(attendances);

        return (
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
            <TableCell>
              {todaysAttendance && todaysAttendance.status !== 'HOLIDAY' && (
                <AddOrRemoveAttendance
                  attendanceId={todaysAttendance?.attendanceId}
                  status={todaysAttendance?.status}
                  studentId={id}
                />
              )}

              {todaysAttendance && todaysAttendance.status === 'HOLIDAY' && (
                <p className='flex items-center gap-1 text-muted-foreground'>
                  <MdError /> Today is holiday
                </p>
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </CommonTable>
  );
};

const CONFIG = {
  PRESENT: 'bg-primary',
  ABSENT: 'border bg-primary-100',
  HOLIDAY: 'bg-gray-700',
};

const AttendanceGrid = ({ attendances }: TAttendanceGridProps) => (
  <div className='flex gap-1'>
    {attendances.map(({ date, status }) => {
      const config = CONFIG[status];

      return (
        <TooltipContainer key={date} label={date}>
          <div className={cn('size-5 rounded-sm', config)} />
        </TooltipContainer>
      );
    })}
  </div>
);

const AddOrRemoveAttendance = ({ status, studentId, attendanceId }: TAddOrRemoveAttendanceProps) => {
  const qc = useQueryClient();

  const { mutate: addAttendanceMutation, isPending: isAdding } = useMutation({
    mutationFn: addAttendance,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.ATTENDANCE] });
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const { mutate: deleteAttendanceMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteAttendance,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.ATTENDANCE] });
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  if (isAdding || isDeleting)
    return (
      <div className='flex items-center gap-2'>
        <Loader className='w-fit' />
        Updating Attendance ...
      </div>
    );

  const handleAddOrRemoveAttendance = (status: string) => {
    if (status === 'PRESENT') addAttendanceMutation({ studentId });
    else if (status === 'ABSENT') deleteAttendanceMutation(attendanceId);
  };

  return (
    <Select value={status} onValueChange={handleAddOrRemoveAttendance}>
      <SelectTrigger>
        <SelectValue placeholder='Select Any' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='PRESENT'>Present</SelectItem>
        <SelectItem value='ABSENT'>Absent</SelectItem>
      </SelectContent>
    </Select>
  );
};

// helper functions
const getTodaysAttendance = (attendances: TAttendanceList[number]['attendances']) => {
  const now = new Date();
  const todaysAttendance = attendances.find((attendance) => {
    if (moment(now).isSame(attendance.date, 'day')) return true;
  });

  return todaysAttendance;
};

// types
type TAddOrRemoveAttendanceProps = Pick<TAttendances[number], 'attendanceId' | 'status'> & { studentId: string };
type TAttendanceList = NonNullable<TGetAttendanceQueryResult['data']>['attendanceList'];
type TAttendances = TAttendanceList[number]['attendances'];
type TAttendanceTableProps = { attendanceList: TAttendanceList };
type TAttendanceGridProps = { attendances: TAttendances };
