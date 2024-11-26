import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { BLOOD_GROUP } from '@/data/constants';
import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddStudentMutation } from '@/data-fetching/hooks/student';
import { useGetClassDetailsQuery, useGetClassesQuery } from '@/data-fetching/hooks/class';

const addStudentFormSchema = z.object({
  name: z.string().min(1, { message: 'Student name is required' }),
  birthId: z.string().min(1, { message: 'Birth id is required' }),
  dob: z.date({ message: 'Invalid birth date' }),
  bloodGroup: z.string().min(1, { message: 'Blood group is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  parents: z.object({
    fatherName: z.string().min(1, { message: 'Father name is required' }),
    motherName: z.string().min(1, { message: 'Mother name is required' }),
  }),
  guardian: z.object({
    name: z.string().min(1, { message: 'Guardian name is required' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    relation: z.string().min(1, { message: 'Relation is required' }),
  }),
  class: z.string().min(1, { message: 'Class is required' }),
  classroomId: z.string().min(1, { message: 'Please assign a classroom' }),
});

type TAddStudentForm = z.infer<typeof addStudentFormSchema>;

export const useAddStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedClass = form.watch('class');

  const { data: classesData, isLoading: isClassesLoading } = useGetClassesQuery();
  const { data: classDetails, isLoading: isClassroomLoading } = useGetClassDetailsQuery(selectedClass, !selectedClass);

  const classes = useMemo(() => {
    return classesData?.data?.map((classData) => ({ label: classData.level, value: classData.id })) || [];
  }, [classesData?.data]);

  const classrooms = useMemo(() => {
    return classDetails?.data.classrooms.map((classroom) => ({ label: classroom.name, value: classroom.id })) || [];
  }, [selectedClass, classDetails?.data]);

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
  }, [selectedClass, form]);

  const { addStudentMutation, isLoading: isAddStudentLoading } = useAddStudentMutation();

  const handleAddStudent = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Student');
    tryCatch({
      id,
      async tryFn() {
        const { dob } = formData;
        const response = await addStudentMutation.mutateAsync({ ...formData, dob: dob.toISOString() });
        toast.success(response.message, { id });

        setIsOpen(false);
      },
    });
  });

  return {
    form,
    handler: { handleAddStudent },
    data: { classes, classrooms, bloodGroups },
    loading: { isClassesLoading, isClassroomLoading, isAddStudentLoading },
    watching: { selectedClass },
    states: { isOpen, setIsOpen },
  };
};
