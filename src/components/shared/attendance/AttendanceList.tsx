import { TAttendanceList } from '@/api/query';

type TAttendanceListProps = Pick<TAttendanceList, 'attendances'>;

export const AttendanceList = ({ attendances }: TAttendanceListProps) => {
  return <>{JSON.stringify(attendances)}</>;
};
