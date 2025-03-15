import { CommonFormField } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ExamForm = ({ defaultValues, onSubmit, formId }: TExamFormPops) => {
  const form = useForm<TExamForm>({
    resolver: zodResolver(examFromSchema),
    defaultValues: defaultValues || { name: '', year: '' },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' id={formId} onSubmit={handleSubmit}>
        <CommonFormField control={form.control} name='name'>
          {({ field }) => <Input {...field} placeholder='Input exam name' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='year'>
          {({ field }) => <Input {...field} placeholder='Input exam year' />}
        </CommonFormField>
      </form>
    </Form>
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
export type TExamForm = z.infer<typeof examFromSchema>;

type TExamFormPops = {
  defaultValues?: TExamForm;
  onSubmit: (formData: TExamForm, reset: () => void) => void;
  formId: string;
};
