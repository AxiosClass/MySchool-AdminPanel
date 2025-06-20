import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';

export const getAttendancesForClassroom = async ({
  classroomId,
  date,
}: TGetAttendancesForClassroomArgs): TPromiseResponse<TAttendanceForClassroom> => {
  const url = apiUrl.getAttendanceForClassroom(classroomId, date);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getAttendancesForStudent = async ({
  start,
  end,
  studentId,
}: TGetAttendancesForStudentArgs): TPromiseResponse<TAttendanceList> => {
  const url = apiUrl.getAttendancesForStudent({ start, end, studentId });
  const response = await axiosInstance.get(url);
  return response.data;
};

export const addAttendance = async (payload: TAddAttendancePayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addAttendance, payload);
  return response.data;
};

export const deleteAttendance = async (attendanceId: string): TPromiseResponse => {
  const url = apiUrl.deleteAttendance(attendanceId);
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const getAttendanceSummaryForStudent = async (
  studentId: string,
): TPromiseResponse<TGetAttendanceSummaryForStudentResult> => {
  const url = apiUrl.getAttendanceSummaryForStudent(studentId);
  const response = await axiosInstance.get(url);
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

export type TAttendanceStatus = 'PRESENT' | 'ABSENT' | 'HOLIDAY';

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

type TGetAttendanceSummaryForStudentResult = { totalPresent: number; totalAbsent: number; totalHolidays: number };
