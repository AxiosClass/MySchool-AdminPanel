import { z } from 'zod';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { tryCatch } from '@/helpers/tryCatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetTeachersQuery } from '@/data-fetching/hooks/teacher';
import { useCreateClassroomMutation } from '@/data-fetching/hooks/classroom';

const createClassroomFormSchema = z.object({
  name: z.string().min(1, { message: 'Classroom name is required' }),
  classTeacherId: z.string().min(1, { message: 'Teacher Id is required' }),
});

type TCreateClassroomFormSchema = z.infer<typeof createClassroomFormSchema>;

export const useCreateClassroom = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { classId } = useParams();

  const form = useForm<TCreateClassroomFormSchema>({
    resolver: zodResolver(createClassroomFormSchema),
    defaultValues: { name: '', classTeacherId: '' },
  });

  const { data: teacherData, isLoading: isTeacherFetching } = useGetTeachersQuery();

  const teachers = useMemo(() => {
    return teacherData?.data?.map(({ id, name }) => ({ label: name, value: id })) || [];
  }, [teacherData?.data]);

  const { createClassroomMutation, isLoading: isClassroomCreating } = useCreateClassroomMutation();

  const handleCreateClassroom = form.handleSubmit(async (formData) => {
    const id = toast.loading('Creating Classroom...!');
    const { name, classTeacherId } = formData;
    tryCatch({
      id,
      async tryFn() {
        const response = await createClassroomMutation.mutateAsync({ classId: classId!, classTeacherId, name });
        toast.success(response.message, { id });
        form.reset();
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    handleCreateClassroom,
    data: { teachers },
    loaders: { isTeacherFetching, isClassroomCreating },
    states: { isDialogOpen, setIsDialogOpen },
  };
};
