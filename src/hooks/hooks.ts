import {
  getClassroomDetails,
  getPayments,
  getStudentInfo,
  getTeachersSubjects,
  getTermsResultSummary,
  getAttendancesForStudent,
  getSubjectListForClassroom,
  getClassList,
  getClassroomList,
  getTeacherList,
} from '@/api/query';

import { QK } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const usePopupState = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  return { open, onOpenChange };
};

export const useSearch = () => {
  const [value, setValue] = useState('');
  const searchTerm = useDebounce(value);
  const onSearchChange = useCallback((value: string) => setValue(value), []);

  return { value, searchTerm, onSearchChange };
};

export type TUseSearch = ReturnType<typeof useSearch>;

// data fetching
export const useGetStudentPayments = (studentId: string) => {
  return useQuery({
    queryKey: [QK.PAYMENT, { studentId }],
    queryFn: () => getPayments({ studentId }),
    select: (res) => res.data,
    enabled: !!studentId,
  });
};

export const useGetClassroomDetails = (classroomId: string) => {
  return useQuery({
    queryKey: [QK.CLASSROOM, { classroomId }],
    queryFn: () => getClassroomDetails(classroomId),
    enabled: !!classroomId,
    select: (res) => res.data,
  });
};

export const useGetTeacherSubjects = (classroomId: string) => {
  return useQuery({
    queryKey: [QK.SUBJECT, { for: 'TEACHER', classroomId }],
    queryFn: () => getTeachersSubjects(classroomId),
    select: (res) => res.data,
  });
};

export const useGetStudentInfo = (studentId: string) => {
  return useQuery({
    queryKey: [QK.STUDENT, { id: studentId }],
    queryFn: () => getStudentInfo(studentId),
    select: (res) => res.data,
    enabled: !!studentId,
  });
};

export const useGetTermResultSummary = (studentId: string, year: string) => {
  return useQuery({
    queryKey: [QK.TERM_RESULT, 'SUMMARY', { studentId, year }],
    queryFn: () => getTermsResultSummary({ studentId, year }),
    select: (res) => res.data,
  });
};

type TUseGetStudentAttendance = { studentId: string; start: string; end: string };
export const useGetStudentAttendance = ({ studentId, start, end }: TUseGetStudentAttendance) => {
  return useQuery({
    queryKey: [QK.ATTENDANCE, 'SUMMARY', { studentId, start, end }],
    queryFn: () => getAttendancesForStudent({ studentId, start, end }),
    select: (res) => res.data,
    enabled: !!studentId,
  });
};

export const useGetSubjectListFormClassroom = (sectionId: string) => {
  return useQuery({
    queryKey: [QK.CLASSROOM, QK.SUBJECT, { sectionId }],
    queryFn: () => getSubjectListForClassroom(sectionId),
    select: (res) => res.data,
  });
};

export const useGetClassListOptions = () => {
  return useQuery({
    queryKey: [QK.CLASS, 'LIST'],
    queryFn: getClassList,
    select: (res) => res.data.map(({ level, name }) => ({ label: name, value: level })),
  });
};

export const useGetClassroomListOptions = (cls: string) => {
  return useQuery({
    queryKey: [QK.CLASSROOM, { classId: cls }],
    queryFn: () => getClassroomList(cls),
    select: (res) => res.data.map(({ id, name }) => ({ label: name, value: id })),
    enabled: !!cls,
  });
};

export const useGetTeacherList = () => {
  return useQuery({
    queryKey: [QK.TEACHER, 'LIST'],
    queryFn: getTeacherList,
    select: (res) => res.data.map((teacher) => ({ label: teacher.name, value: teacher.id })),
  });
};
