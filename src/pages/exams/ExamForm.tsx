import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CommonFormField } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const ExamForm = ({ formId, onSubmit, remainingPercentile, defaultValues }: TExamFormProps) => {
  const form = useForm<TExamForm>({
    resolver: zodResolver(generateExamFormSchema(remainingPercentile)),
    defaultValues: { name: defaultValues?.name, percentile: defaultValues?.percentile },
  });

  const handleSubmit = form.handleSubmit((formData) => onSubmit(formData, form.reset));

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' id={formId} onSubmit={handleSubmit}>
        <p className='rounded-md bg-primary-100 p-1 text-center'>
          Remaining Percentile : <span className='font-semibold'>{remainingPercentile}%</span>{' '}
        </p>
        <CommonFormField control={form.control} name='name' label='Exam Name'>
          {({ field }) => <Input {...field} placeholder='Input exam name' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='percentile' label='Exam Percentile'>
          {({ field }) => <Input {...field} placeholder='Input exam year' />}
        </CommonFormField>
      </form>
    </Form>
  );
};

const generateExamFormSchema = (remainingPercentile: number) => {
  return z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      percentile: z.string(),
    })
    .superRefine((val, ctx) => {
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

export type TExamForm = z.infer<ReturnType<typeof generateExamFormSchema>>;

type TExamFormProps = {
  formId: string;
  defaultValues?: TExamForm;
  onSubmit: (formData: TExamForm, reset: () => void) => void;
  remainingPercentile: number;
};
