import { TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClassroom = async (payload: TCreateClassroomPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.createClassroom, payload);
  return response?.data;
};

export const getClassroomSubjectsWithTeacher = async (
  classroomId: string,
): TPromiseResponse<TGetClassroomSubjectsWithTeacher[]> => {
  const response = await axiosInstance.get(apiUrl.getClassroomSubjectsWithTeacher(classroomId));
  return response?.data;
};

export const assignSubjectTeacher = async (payload: TAssignSubjectTeacherPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.assignSubjectTeacher, payload);
  return response?.data;
};

// type
type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };

type TGetClassroomSubjectsWithTeacher = {
  name: string;
  id: string;
  teacher: { id: string; name: string };
};

type TAssignSubjectTeacherPayload = { teacherId: string; classroomId: string; classSubjectId: string };
