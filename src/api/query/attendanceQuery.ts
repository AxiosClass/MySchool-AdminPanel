import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';

export const getAttendancesForClassroom = async ({
  classroomId,
  range,
}: TGetAttendancesForClassroomArgs): TPromiseResponse<TAttendanceForClassroom> => {
  const response = await axiosInstance.get(apiUrl.getAttendanceForClassroom(classroomId, range));
  return response.data;
};

export const getAttendancesForStudent = async ({
  start,
  end,
}: TGetAttendancesForStudentArgs): TPromiseResponse<TAttendanceList> => {
  const response = await axiosInstance.get(apiUrl.getAttendancesForStudent({ start, end }));
  return response.data;
};

export const addAttendance = async (payload: TAddAttendancePayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addAttendance, payload);
  return response.data;
};

export const deleteAttendance = async (attendanceId: string): TPromiseResponse<null> => {
  const response = await axiosInstance.delete(apiUrl.deleteAttendance(attendanceId));
  return response.data;
};

// type
type TGetAttendancesForClassroomArgs = { classroomId: string; range: number };
type TAttendanceForClassroom = { attendanceList: TAttendanceList[]; classroomInfo: { name: string; class: string } };
type TGetAttendancesForStudentArgs = { start: string; end: string };
type TAddAttendancePayload = { studentId: string; date?: string };
type TAttendance = { date: string; status: TAttendanceStatus; attendanceId: string };
type TAttendanceStatus = 'PRESENT' | 'ABSENT' | 'HOLIDAY';
type TAttendanceList = { id: string; name: string; attendances: TAttendance[] };
