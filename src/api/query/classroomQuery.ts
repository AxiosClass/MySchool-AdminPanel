import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClassroom = async (payload: TCreateClassroomPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.createClassroom, payload);
  return response?.data;
};

export const getSubjectsWithTeacher = async (classroomId: string): TPromiseResponse<TGetSubjectsWithTeacher[]> => {
  const response = await axiosInstance.get(apiUrl.getSubjectsWithTeacher(classroomId));
  return response?.data;
};

export const assignSubjectTeacher = async (payload: TAssignSubjectTeacherPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.assignSubjectTeacher, payload);
  return response?.data;
};

export const deleteSubjectTeacher = async (classRoomSubjectTeacherId: string): TPromiseResponse => {
  const response = await axiosInstance.delete(apiUrl.deleteSubjectTeacher(classRoomSubjectTeacherId));
  return response?.data;
};

export const getClassroomsForTeacher = async (teacherId: string): TPromiseResponse<TGetClassroomForTeacher> => {
  const response = await axiosInstance.get(apiUrl.getClassroomsForTeacher(teacherId));
  return response?.data;
};

export const uploadMaterial = async (formData: FormData) => {
  const response = await axiosInstance.post('/classroom/upload-material', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// type
type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };

export type TGetSubjectsWithTeacher = {
  name: string;
  id: string;
  classroomSubjectTeacherId: string;
  teacher?: { id: string; name: string };
};

type TAssignSubjectTeacherPayload = { teacherId: string; classroomId: string; classSubjectId: string };
type TClassroomDetails = { id: string; name: string; class: { name: string }; students: { id: string }[] };
type TGetClassroomForTeacher = { asClassTeacher: TClassroomDetails[]; asSubjectTeacher: TClassroomDetails[] };
