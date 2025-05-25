import { TMedia, TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClassroom = async (payload: TCreateClassroomPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.createClassroom, payload);
  return response.data;
};

export const getSubjectListForClassroom = async (classroomId: string): TPromiseResponse<TGetSubjectsForClassroom[]> => {
  const response = await axiosInstance.get(apiUrl.getSubjectListForClassroom(classroomId));
  return response.data;
};

export const assignSubjectTeacher = async (payload: TAssignSubjectTeacherPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.assignSubjectTeacher, payload);
  return response.data;
};

export const deleteSubjectTeacher = async (classRoomSubjectTeacherId: string): TPromiseResponse => {
  const response = await axiosInstance.delete(apiUrl.deleteSubjectTeacher(classRoomSubjectTeacherId));
  return response.data;
};

export const getClassroomsForTeacher = async (teacherId: string): TPromiseResponse<TGetClassroomForTeacher> => {
  const response = await axiosInstance.get(apiUrl.getClassroomsForTeacher(teacherId));
  return response.data;
};

export const getClassroomDetails = async (classroomId: string): TPromiseResponse<TGetClassroomDetails> => {
  const response = await axiosInstance.get(apiUrl.getClassroomDetails(classroomId));
  return response.data;
};

export const addNote = async (payload: TAddNotePayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addNote, payload);
  return response.data;
};

// type
export type TGetSubjectsForClassroom = {
  id: string | null;
  subjectName: string;
  subjectId: string;
  teacher?: { id: string; name: string; phone?: string };
};

type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };
type TAssignSubjectTeacherPayload = { teacherId: string; classroomId: string; subjectId: string };
type TClassroomInfo = { id: string; name: string; class: { name: string }; students: { id: string }[] };
type TGetClassroomForTeacher = { asClassTeacher: TClassroomInfo[]; asSubjectTeacher: TClassroomInfo[] };
type TGetClassroomDetails = { name: string; level: string; classTeacher: { id: string; name: string } | null };
type TAddNotePayload = { classroomId: string; title: string; description: string; media?: TMedia[] };
