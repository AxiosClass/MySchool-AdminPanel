import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';

export const getAttendancesForClassroom = async ({
  classroomId,
  range,
}: TGetAttendancesForClassroomArgs): TPromiseResponse<TAttendanceForClassroom> => {
  const response = await axiosInstance.get(apiUrl.getAttendanceForClassroom(classroomId, range));
  return response?.data;
};

// type
type TGetAttendancesForClassroomArgs = { classroomId: string; range: number };

type TAttendanceForClassroom = {
  attendanceList: { id: string; name: string; attendances: TAttendance[] }[];
  classroomInfo: { name: string; class: string };
};

type TAttendance = { date: string; status: TAttendanceStatus; attendanceId: string };
type TAttendanceStatus = 'PRESENT' | 'ABSENT' | 'HOLIDAY';
