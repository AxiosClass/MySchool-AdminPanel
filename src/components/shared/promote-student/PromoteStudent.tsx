import { z } from 'zod';
import { QK } from '@/api';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { useGetClassListOptions, useGetClassroomListOptions, usePopupState } from '@/hooks';
import { CommonFormField, CommonSelect, FormDialog } from '../form';
import { useForm, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { promoteStudent } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

export const PromoteStudent = ({ studentId }: { studentId: string }) => {
  const { open, onOpenChange } = usePopupState();
  const formId = `${QK.STUDENT}_PROMOTE_${studentId}`;
  const qc = useQueryClient();

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: promoteStudent });

  const handlePromoteStudent = (formData: TPromoteForm, reset: () => void) => {
    mutate(
      { ...formData, studentId },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.STUDENT] });
          reset();
          onOpenChange(false);
        },
        onError: (error) => errorToast(error),
      },
    );
  };

  return (
    <>
      <Button variant='outline' onClick={() => onOpenChange(true)} className='w-44 bg-white'>
        <TbRosetteDiscountCheckFilled className='size-4' /> Promote Student
      </Button>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        title='Promote Student'
        description='Fill up the following info'
        formId={formId}
        submitButtonTitle='Promote'
        submitLoadingTitle='Promoting...'
      >
        <PromoteForm formId={formId} onSubmit={handlePromoteStudent} />
      </FormDialog>
    </>
  );
};

type TPromoteFormProps = { formId: string; onSubmit: (formData: TPromoteForm, reset: () => void) => void };

const PromoteForm = ({ formId, onSubmit }: TPromoteFormProps) => {
  const form = useForm<TPromoteForm>({
    resolver: zodResolver(promoteFormSchema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form id={formId} className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <ClassSelection />
        <ClassroomSelection />
      </form>
    </Form>
  );
};

const ClassSelection = () => {
  const { control, setValue } = useFormContext<TPromoteForm>();
  const { data: classes, isLoading } = useGetClassListOptions();

  return (
    <CommonFormField control={control} name='classLevel' label='Class'>
      {({ field }) => (
        <CommonSelect
          value={field.value}
          onChange={(val) => {
            setValue('classroomId', '');
            field.onChange(val);
          }}
          placeholder='Select class'
          options={classes || []}
          isLoading={isLoading}
          disabled={isLoading}
        />
      )}
    </CommonFormField>
  );
};

const ClassroomSelection = () => {
  const { watch, control } = useFormContext<TPromoteForm>();
  const selectedClass = watch('classLevel');

  const { data: classrooms, isLoading } = useGetClassroomListOptions(selectedClass);

  return (
    <CommonFormField control={control} name='classroomId' label='Section'>
      {({ field }) => (
        <CommonSelect
          value={field.value}
          onChange={field.onChange}
          placeholder='Select classroom'
          options={classrooms || []}
          isLoading={isLoading}
          disabled={!selectedClass}
        />
      )}
    </CommonFormField>
  );
};

const promoteFormSchema = z.object({
  classLevel: z.string().min(1, { message: 'Class is required' }),
  classroomId: z.string().min(1, { message: 'Please select a classroomId' }),
});

type TPromoteForm = z.infer<typeof promoteFormSchema>;
