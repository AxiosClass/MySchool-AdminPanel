import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CommonFormField, CommonSelect } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { assignSubjectTeacher, getTeachers } from '@/api/query';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { errorMessageGen } from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';

export const AssignSubjectTeacher = ({ classroomId, classSubjectId }: TAssignSubjectTeacherProps) => {
  const qc = useQueryClient();
  const form = useForm<TAssignTeacherForm>({ resolver: zodResolver(assignTeacherSchema) });
  const selectedTeacher = form.watch('teacherId');

  // data fetching
  const { data: teachers, isLoading: isTeacherDataLoading } = useQuery({
    queryKey: [QK.TEACHER, 'LIST'],
    queryFn: getTeachers,
    select: (res) => res.data.map(({ name, id }) => ({ label: name, value: id })),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: assignSubjectTeacher,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.TEACHER, 'LIST'] });
      qc.invalidateQueries({ queryKey: [QK.CLASSROOM, { classroomId }] });
      toast.success(res.message);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAssignSubjectTeacher = form.handleSubmit((formData) => {
    mutate({ teacherId: formData.teacherId, classroomId, classSubjectId });
  });

  return (
    <Form {...form}>
      <form className='grid grid-cols-2 items-center gap-4 p-1' onSubmit={handleAssignSubjectTeacher}>
        <CommonFormField control={form.control} name='teacherId'>
          {({ field }) => (
            <CommonSelect
              {...field}
              placeholder='Select teacher'
              options={teachers || []}
              isLoading={isTeacherDataLoading}
            />
          )}
        </CommonFormField>

        <Button size='icon' type='submit' disabled={!selectedTeacher} isLoading={isPending}>
          {!isPending && <CheckIcon />}
        </Button>
      </form>
    </Form>
  );
};

// schema
const assignTeacherSchema = z.object({
  teacherId: z.string().min(1, { message: 'Teacher id is required' }),
});

// type
type TAssignSubjectTeacherProps = {
  classroomId: string;
  classSubjectId: string;
};

type TAssignTeacherForm = z.infer<typeof assignTeacherSchema>;
