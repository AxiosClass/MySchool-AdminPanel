import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { QK } from '@/api';
import { CommonFormField, CommonSelect } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { assignSubjectTeacher, getTeachers } from '@/api/query';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helpers';
import { Loader } from '@/components/ui/loader';

export default function AssignSubjectTeacher({ classroomId, classSubjectId }: TAssignSubjectTeacherProps) {
  const formId = QK.CLASSROOM + '_ASSIGN_SUBJECT_TEACHER';
  const qc = useQueryClient();

  // form
  const form = useForm<TAssignTeacherForm>();

  // watch
  const selectedTeacher = form.watch('teacherId');

  // data fetching
  const { data: teachers, isLoading: isTeacherDataLoading } = useQuery({
    queryKey: [QK.TEACHER, 'LIST'],
    queryFn: getTeachers,
    select: (res) => res.data.map(({ name, id }) => ({ label: name, value: id })),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [formId],
    mutationFn: assignSubjectTeacher,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.TEACHER, 'LIST'] });
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASSROOM, { classroomId }] });
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAssignSubjectTeacher = form.handleSubmit((formData) => {
    const assignSubjectTeacherData = { teacherId: formData.teacherId, classroomId, classSubjectId };

    mutate(assignSubjectTeacherData);
  });

  return (
    <Form {...form}>
      <form id={formId} className='grid grid-cols-2 gap-4 p-1' onSubmit={handleAssignSubjectTeacher}>
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

        <Button size='icon' type='submit' disabled={!selectedTeacher || isPending}>
          {isPending ? <Loader className='w-fit' /> : <CheckIcon className='size-4' />}
        </Button>
      </form>
    </Form>
  );
}

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
