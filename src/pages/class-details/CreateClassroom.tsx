import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { useGetTeacherList, usePopupState } from '@/hooks';
import { useForm } from 'react-hook-form';
import { ActionButton } from '@/components/ui/button';
import { FormDialog } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CommonFormField, CommonSelect } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClassroom } from '@/api/query';
import { useParams } from 'react-router-dom';
import { errorToast } from '@/helpers';

export const CreateClassroom = () => {
  const { open, onOpenChange } = usePopupState();
  const { classId } = useParams();

  const formId = QK.CLASSROOM + '_CREATE';
  const qc = useQueryClient();

  const form = useForm<TCreateClassroomForm>({
    resolver: zodResolver(createClassroomFormSchema),
    defaultValues: { name: '', classTeacherId: '' },
  });

  const { data: teacherList, isLoading } = useGetTeacherList();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: createClassroom,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      toast.success(res.message);
      onOpenChange(false);
    },
    onError: errorToast,
  });

  const handleCreateClassroom = form.handleSubmit((formData) => {
    const { name, classTeacherId } = formData;
    mutate({ name, classTeacherId, classId: classId as string });
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Add Section' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Section'
        description='Provide following information to create Section'
        submitButtonTitle='Create Section'
        submitLoadingTitle='Creating...'
      >
        <Form {...form}>
          <form className='space-y-3' id={formId} onSubmit={handleCreateClassroom}>
            <CommonFormField control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='classTeacherId' label='Class Teacher'>
              {({ field }) => (
                <CommonSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Select Teacher'
                  options={teacherList || []}
                  disabled={isLoading}
                />
              )}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

// schema
const createClassroomFormSchema = z.object({
  name: z.string().min(1, { message: 'Classroom name is required' }),
  classTeacherId: z.string().min(1, { message: 'TeacherId is required' }),
});

// types
type TCreateClassroomForm = z.infer<typeof createClassroomFormSchema>;
