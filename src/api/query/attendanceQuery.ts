import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';

export const getAttendancesForClassroom = async ({
  classroomId,
  date,
}: TGetAttendancesForClassroomArgs): TPromiseResponse<TAttendanceForClassroom> => {
  const response = await axiosInstance.get(apiUrl.getAttendanceForClassroom(classroomId, date));
  return response.data;
};

export const getAttendancesForStudent = async ({
  start,
  end,
  studentId,
}: TGetAttendancesForStudentArgs): TPromiseResponse<TAttendanceList> => {
  const response = await axiosInstance.get(apiUrl.getAttendancesForStudent({ start, end, studentId }));
  return response.data;
};

export const addAttendance = async (payload: TAddAttendancePayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addAttendance, payload);
  return response.data;
};

export const deleteAttendance = async (attendanceId: string): TPromiseResponse => {
  const response = await axiosInstance.delete(apiUrl.deleteAttendance(attendanceId));
  return response.data;
};

// type
type TGetAttendancesForClassroomArgs = { classroomId: string; date: string };
type TGetAttendancesForStudentArgs = { start: string; end: string; studentId: string };
type TAddAttendancePayload = { studentId: string; date?: string };

export type TAttendanceForClassroom = {
  attendanceList: TAttendance[];
  totalStudents: number;
  totalPresent: number;
  classTeacherId: string;
};

type TAttendanceStatus = 'PRESENT' | 'ABSENT' | 'HOLIDAY';

export type TAttendanceList = {
  id: string;
  name: string;
  attendances: Array<{
    date: string;
    status: TAttendanceStatus;
    attendanceId: string;
  }>;
};

type TAttendance = {
  date: string;
  studentId: string;
  name: string;
  attendanceId: string;
  status: TAttendanceStatus;
};
