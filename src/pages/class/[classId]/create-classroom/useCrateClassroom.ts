import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { CREATE_CLASSROOM, GET_CLASS_BY_ID, ICreateClassroomResponse, TCreateClassroomPayload } from '@/lib/queries';
import { toast } from 'sonner';
import { tryCatch } from '@/helpers';
import { useState } from 'react';

const createClassroomFormSchema = z.object({
  name: z.string().min(1, { message: 'Classroom name is required' }),
  teacherId: z.string().min(1, { message: 'Teacher Id is required' }),
});

type TCreateClassroomFormSchema = z.infer<typeof createClassroomFormSchema>;

export const useCreateClassroom = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { classId } = useParams();

  const form = useForm<TCreateClassroomFormSchema>({
    resolver: zodResolver(createClassroomFormSchema),
    defaultValues: { name: '', teacherId: '' },
  });

  const [createClassroom, { loading }] = useMutation<ICreateClassroomResponse, TCreateClassroomPayload>(
    CREATE_CLASSROOM,
    { refetchQueries: [GET_CLASS_BY_ID] },
  );

  const handleCreateClassroom = form.handleSubmit(async (formData) => {
    const id = toast.loading('Creating Classroom...!');
    const { name, teacherId } = formData;
    tryCatch({
      id,
      async tryFn() {
        await createClassroom({
          variables: { name, teacherId, classId: classId as string },
        });

        toast.success('Classroom created', { id });
        form.reset();
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    handleCreateClassroom,
    isLoading: loading,
    states: { isDialogOpen, setIsDialogOpen },
  };
};
