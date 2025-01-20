import { z } from 'zod';
import { QK } from '@/api';
import { ActionButton } from '@/components/ui/button';
import { FormDialog } from '@/components/ui/dialog';
import { CommonFormFiled, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CommonSelect } from '@/components/shared/form';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createClassroom, getTeacherList } from '@/api/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helpers';
import { useParams } from 'react-router-dom';

const createClassroomFormSchema = z.object({
  name: z.string().min(1, { message: 'Classroom name is required' }),
  classTeacherId: z.string().min(1, { message: 'TeacherId is required' }),
});

type TCreateClassroomForm = z.infer<typeof createClassroomFormSchema>;

const formId = QK.CLASSROOM + '_CREATE';

export const CreateClassroom = () => {
  const { open, onOpenChange } = usePopupState();
  const { classId } = useParams();
  const qc = useQueryClient();

  const form = useForm<TCreateClassroomForm>({
    resolver: zodResolver(createClassroomFormSchema),
    defaultValues: { name: '', classTeacherId: '' },
  });

  const { data: teacherData, isLoading } = useQuery({
    queryKey: [QK.TEACHER, 'LIST'],
    queryFn: getTeacherList,
    select: (res) => res.data.map(({ id, name }) => ({ label: name, value: id })),
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: createClassroom,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      toast.success(res.message);
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleCreateClassroom = form.handleSubmit((formData) => {
    const { name, classTeacherId } = formData;
    mutate({ name, classTeacherId, classId: classId as string });
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Add Classroom' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Classroom'
        description='Provide following information to create classroom'
        submitButtonTitle='Create Classroom'
        submitLoadingTitle='Creating...'
      >
        <Form {...form}>
          <form className='space-y-3' id={formId} onSubmit={handleCreateClassroom}>
            <CommonFormFiled control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input name' />}
            </CommonFormFiled>
            <CommonFormFiled control={form.control} name='classTeacherId' label='Class Teacher'>
              {({ field }) => (
                <CommonSelect
                  placeholder='Select Teacher'
                  options={teacherData || []}
                  value={field.value}
                  onValueChange={field.onChange}
                  isLoading={isLoading}
                />
              )}
            </CommonFormFiled>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};
