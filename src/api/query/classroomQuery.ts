import { SUBJECT_TYPE, TMedia, TNote, TPromiseResponse, TSubject, TTeacher } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';
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

export const getClassroomsForTeacher = async (teacherId: string): TPromiseResponse<TGetClassroomForTeacherResponse> => {
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

export const getNotes = async (
  classroomId: string,
  args: { subjectId?: string },
): TPromiseResponse<TGetNotesQueryResult> => {
  const response = await axiosInstance.get(apiUrl.getNotes(classroomId, makeUrlParams(args)));
  return response.data;
};

export const updateNote = async (payload: TUpdateNotePayload): TPromiseResponse => {
  const { id, ...restPayload } = payload;
  const response = await axiosInstance.patch(apiUrl.updateNote(id), restPayload);
  return response.data;
};

export const deleteNote = async (noteId: string): TPromiseResponse => {
  const response = await axiosInstance.delete(apiUrl.deleteNote(noteId));
  return response.data;
};

export const getTeachersSubjects = async (classroomId: string): TPromiseResponse<TGetTeacherSubjectsResponse> => {
  const response = await axiosInstance.get(apiUrl.getTeacherSubjects(classroomId));
  return response.data;
};

// type
export type TGetSubjectsForClassroom = {
  id: string | null;
  subjectName: string;
  subjectId: string;
  subjectType: SUBJECT_TYPE;
  teacher?: { id: string; name: string; phone?: string };
};

type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };
type TAssignSubjectTeacherPayload = { teacherId: string; classroomId: string; subjectId: string };
type TClassroomInfo = { id: string; name: string; class: { level: string }; students: { id: string }[] };
type TGetClassroomForTeacherResponse = { asClassTeacher: TClassroomInfo[]; asSubjectTeacher: TClassroomInfo[] };
type TGetClassroomDetails = { name: string; level: string; classTeacher: { id: string; name: string } | null };
type TAddNotePayload = Pick<TNote, 'title' | 'classroomId' | 'description' | 'media' | 'subjectId'>;

export type TGetNotesQueryResult = Array<
  Pick<TNote, 'id' | 'title' | 'description' | 'media' | 'createdAt' | 'classroomId'> & {
    teacher: Pick<TTeacher, 'id' | 'name'>;
    subject: Pick<TSubject, 'id' | 'name'>;
  }
>;

export type TUpdateNotePayload = Pick<TNote, 'id' | 'title' | 'description'> & {
  media: { old: TMedia[]; new: TMedia[] };
};

type TGetTeacherSubjectsResponse = Array<Pick<TSubject, 'id' | 'name'>>;
