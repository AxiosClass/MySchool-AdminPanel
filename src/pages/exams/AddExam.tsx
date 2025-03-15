import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { addExam } from '@/api/query';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionButton } from '@/components/ui/button';
import { errorMessageGen } from '@/helpers';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const formId = QK.EXAM + '_ADD';
export const AddExam = () => {
  const form = useForm<TExamForm>({ resolver: zodResolver(examFromSchema), defaultValues: { name: '', year: '' } });

  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addExam,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.EXAM] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddExam = form.handleSubmit((formData) => mutate({ ...formData, year: Number(formData.year) }));

  return (
    <>
      <ActionButton actionType='ADD' label='Add Exam' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Exam'
        description='Please fill all the fields'
        submitButtonTitle='Add Exam'
        submitLoadingTitle='Adding...'
      >
        <Form {...form}>
          <form className='flex flex-col gap-3' id={formId} onSubmit={handleAddExam}>
            <CommonFormField control={form.control} name='name'>
              {({ field }) => <Input {...field} placeholder='Input exam name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='year'>
              {({ field }) => <Input {...field} placeholder='Input exam year' />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const examFromSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    year: z.string().min(1, { message: 'Year is required' }),
  })
  .superRefine((val, ctx) => {
    const year = Number(val.year);
    if (!year) ctx.addIssue({ code: 'custom', message: 'Invalid Year', path: ['year'] });

    const currentYear = new Date().getFullYear();
    if (year > currentYear)
      ctx.addIssue({ code: 'custom', message: 'Year must be less than or equal to current year', path: ['year'] });
  });

// type
type TExamForm = z.infer<typeof examFromSchema>;
