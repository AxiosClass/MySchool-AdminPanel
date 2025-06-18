import { QK } from '@/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Loading } from '@/components/loader';
import { addAttendance, deleteAttendance, TAttendanceForClassroom } from '@/api/query';
import { Card, CardContent } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { errorToast } from '@/helpers';
import { Link } from 'react-router-dom';

type TAttendanceCardProps = TAttendanceForClassroom['attendanceList'][number] & { isClassTeacher: boolean };

export const AttendanceCard = ({
  status,
  name,
  studentId,
  isClassTeacher,
  attendanceId,
  date,
}: TAttendanceCardProps) => {
  const config = ATTENDANCE_STATUS_CONFIG[status];

  return (
    <Card className={cn('border-l-4 transition-colors', config.cardClassName)}>
      <CardContent className='flex items-center gap-4 p-4'>
        <Link to={`/student/${studentId}`}>
          <StudentAvatar name={name} className={config?.indicatorClass} />
        </Link>

        <div className='min-w-0 flex-1'>
          <Link to={`/student/${studentId}`}>
            <h3 className='truncate font-semibold'>{name}</h3>
          </Link>

          <p className='mt-1 text-sm text-muted-foreground'>
            <span className='font-bold'># </span>
            {studentId}
          </p>
        </div>

        <Badge variant='outline' className={cn('p-1 font-semibold', config?.badgeClass)}>
          {config?.label}
        </Badge>

        {isClassTeacher && (
          <div className='border-l-2 border-gray-200 pl-4'>
            <AttendanceController attendanceId={attendanceId} studentId={studentId} date={date} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type TStudentAvatarProps = Pick<TAttendanceCardProps, 'name'> & { className: string };

const StudentAvatar = ({ name, className }: TStudentAvatarProps) => {
  return (
    <div className='relative'>
      <Avatar className='size-12 border-2 border-white shadow-md'>
        <AvatarFallback className='bg-gradient-to-br from-slate-600 to-slate-700 font-medium text-white'>
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {/* Status indicator dot */}
      <div className={cn('absolute -bottom-0 -right-1 size-5 rounded-full border-2 border-white', className)} />
    </div>
  );
};

type TAttendanceControllerProps = Pick<TAttendanceCardProps, 'attendanceId' | 'studentId' | 'date'>;

const AttendanceController = ({ attendanceId, studentId, date }: TAttendanceControllerProps) => {
  const qc = useQueryClient();

  const { mutate: handleAddAttendance, isPending: isAddingAttendance } = useMutation({
    mutationFn: addAttendance,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.ATTENDANCE] });
    },
    onError: (error) => errorToast(error),
  });

  const { mutate: handleDeleteAttendance, isPending: isRemovingAttendance } = useMutation({
    mutationFn: deleteAttendance,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.ATTENDANCE] });
    },
    onError: (error) => errorToast(error),
  });

  const handleToggleAttendance = () => {
    if (isAddingAttendance || isRemovingAttendance) return;
    if (attendanceId) return handleDeleteAttendance(attendanceId);
    handleAddAttendance({ studentId, date });
  };

  if (isAddingAttendance || isRemovingAttendance) return <Loading />;

  return (
    <Switch
      checked={!!attendanceId}
      onCheckedChange={handleToggleAttendance}
      className='data-[state=checked]:bg-primary'
    />
  );
};

const ATTENDANCE_STATUS_CONFIG = {
  PRESENT: {
    label: 'PRESENT',
    badgeClass: 'border-primary-100 bg-primary-50 text-primary',
    cardClassName: 'border-l-primary-500 bg-primary-50/50 hover:bg-primary-50',
    indicatorClass: 'bg-primary-800',
  },
  ABSENT: {
    label: 'ABSENT',
    badgeClass: 'border-red-200 bg-red-100 text-red-500',
    cardClassName: 'border-l-red-500 bg-red-50/50 hover:bg-red-50',
    indicatorClass: 'bg-red-800',
  },
  HOLIDAY: {
    label: 'HOLIDAY',
    badgeClass: 'border-neutral-200 bg-neutral-100',
    cardClassName: 'border-l-neutral-500 bg-neutral-50/50 hover:bg-neutral-50',
    indicatorClass: 'bg-neutral-800',
  },
};
