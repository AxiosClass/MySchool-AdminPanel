import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { addExam, getExams } from '@/api/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionButton } from '@/components/ui/button';
import { errorMessageGen } from '@/helpers';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const date = new Date();
const year = date.getFullYear().toString();
const formId = QK.EXAM + '_ADD';

export const AddExam = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { data: percentile = 0 } = useQuery({
    queryKey: [QK.EXAM, { year }],
    queryFn: () => getExams({ year }),
    select: (res) => res.data.reduce((acc, exam) => acc + exam.percentile, 0),
  });

  const remainingPercentile = 100 - percentile;
  const form = useForm<TExamForm>({
    resolver: zodResolver(generateExamFormSchema(remainingPercentile)),
    defaultValues: { name: '', year: '' },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addExam,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.EXAM] });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddExam = form.handleSubmit((formData) => {
    mutate({ ...formData, year: Number(formData.year), percentile: Number(formData.percentile) });
  });

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
            <p className='rounded-md bg-primary-100 p-1 text-center'>
              Remaining Percentile : <span className='font-semibold'>{remainingPercentile}%</span>{' '}
            </p>
            <CommonFormField control={form.control} name='name' label='Exam Name'>
              {({ field }) => <Input {...field} placeholder='Input exam name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='year' label='Exam Year'>
              {({ field }) => <Input {...field} placeholder='Input exam year' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='percentile' label='Exam Percentile'>
              {({ field }) => <Input {...field} placeholder='Input exam year' />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const generateExamFormSchema = (remainingPercentile: number) => {
  return z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      year: z.string().min(1, { message: 'Year is required' }),
      percentile: z.string(),
    })
    .superRefine((val, ctx) => {
      const year = Number(val.year);
      if (!year) ctx.addIssue({ code: 'custom', message: 'Invalid Year', path: ['year'] });

      const currentYear = new Date().getFullYear();
      if (year > currentYear)
        ctx.addIssue({ code: 'custom', message: 'Year must be less than or equal to current year', path: ['year'] });

      const percentile = Number(val.percentile);
      if (!percentile || percentile < 0 || percentile > 100)
        ctx.addIssue({ code: 'custom', message: 'Invalid Percentile', path: ['percentile'] });

      if (percentile > remainingPercentile)
        ctx.addIssue({
          code: 'custom',
          message: 'Percentile must be less than or equal to remaining percentile',
          path: ['percentile'],
        });
    });
};

// type
type TExamForm = z.infer<ReturnType<typeof generateExamFormSchema>>;
