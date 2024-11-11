import { BLOOD_GROUP } from '@/data';
import {
  GET_CLASSES,
  GET_CLASSROOM_BY_CLASS_LEVEL,
  IGetClassesResponse,
  IGetClassroomByClassLevelArgs,
  IGetClassroomByClassLevelResponse,
} from '@/lib/queries';

import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addStudentFormSchema = z.object({
  name: z.string().min(1, { message: 'Student name is required' }),
  birthId: z.string().min(1, { message: 'Birth id is required' }),
  class: z.string().min(1, { message: 'Class is required' }),
  classroomId: z.string().min(1, { message: 'Please assign a classroom' }),
  bloodGroup: z.string().min(1, { message: 'Blood group is required' }),
  parents: z.object({
    fatherName: z.string().min(1, { message: 'Father name is required' }),
    motherName: z.string().min(1, { message: 'Mother name is required' }),
  }),
  guardian: z.object({
    name: z.string().min(1, { message: 'Guardian name is required' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    relation: z.string().min(1, { message: 'Relation is required' }),
  }),
  address: z.string().min(1, { message: 'Address is required' }),
  dob: z.date({ message: 'Invalid birth date' }),
});

type TAddStudentForm = z.infer<typeof addStudentFormSchema>;

export const useAddStudent = () => {
  const form = useForm<TAddStudentForm>({
    resolver: zodResolver(addStudentFormSchema),
    defaultValues: {
      name: '',
      birthId: '',
      class: '',
      classroomId: '',
      bloodGroup: '',
      parents: { fatherName: '', motherName: '' },
      guardian: { name: '', phone: '', relation: '' },
      address: '',
      dob: new Date(),
    },
  });

  // data fetching to get classes
  const { data: classData, loading: isClassesLoading } =
    useQuery<IGetClassesResponse>(GET_CLASSES);

  const classes = useMemo(() => {
    return (
      classData?.classes?.map((classInfo) => ({
        label: classInfo.name,
        value: classInfo.level,
      })) || []
    );
  }, [classData?.classes]);

  // data fetching to get classroom
  const classLevel = form.watch('class');
  const { data: classroomsData, loading: isClassroomLoading } = useQuery<
    IGetClassroomByClassLevelResponse,
    IGetClassroomByClassLevelArgs
  >(GET_CLASSROOM_BY_CLASS_LEVEL, {
    variables: { level: classLevel },
    skip: !classLevel,
  });

  const classrooms = useMemo(() => {
    return (
      classroomsData?.classrooms?.map((classroom) => ({
        label: classroom.name,
        value: classroom.id,
      })) || []
    );
  }, [classroomsData?.classrooms]);

  // for bloodGroup
  const bloodGroups = useMemo(() => {
    return BLOOD_GROUP.map((eachGroup) => ({
      label: eachGroup,
      value: eachGroup,
    }));
  }, []);

  // for syncing
  useEffect(() => {
    form.setValue('classroomId', '');
    console.log('triggered');
  }, [classLevel, form]);

  const handleAddStudent = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return {
    form,
    handleAddStudent,
    data: { classes, classrooms, bloodGroups },
    loading: { isClassesLoading, isClassroomLoading },
    watching: { classLevel },
  };
};
