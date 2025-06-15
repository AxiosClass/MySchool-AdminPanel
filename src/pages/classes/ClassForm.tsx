import { CommonFormField } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TClass } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TClassFormValues = Pick<TClass, 'name' | 'level' | 'admissionFee' | 'monthlyFee' | 'termFee'>;
type TClassFormProps = {
  formId: string;
  onSubmit: (formData: TClassForm, reset: () => void) => void;
  defaultValues?: Partial<TClassFormValues>;
};

export const ClassForm = ({ formId, onSubmit, defaultValues }: TClassFormProps) => {
  const form = useForm<TClassForm>({
    resolver: zodResolver(classFormSchema),
    defaultValues: defaultValues ?? { name: '', level: '' },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form id={formId} className='space-y-3' onSubmit={handleSubmit}>
        <CommonFormField control={form.control} name='name' label='Name'>
          {({ field }) => <Input {...field} placeholder='Input class name' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='level' label='Level'>
          {({ field }) => <Input {...field} placeholder='Input level' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='monthlyFee' label='Monthly Fee'>
          {({ field }) => (
            <Input
              // value={field.value}
              // onChange={(e) => field.onChange(Number(e.target.value))}
              {...field}
              placeholder='Input monthly fee'
              type='number'
              min={0}
            />
          )}
        </CommonFormField>
        <CommonFormField control={form.control} name='admissionFee' label='Admission Fee'>
          {({ field }) => (
            <Input
              // value={field.value}
              // onChange={(e) => field.onChange(Number(e.target.value))}
              {...field}
              placeholder='Input admission fee'
              type='number'
              min={0}
            />
          )}
        </CommonFormField>
        <CommonFormField control={form.control} name='termFee' label='Term Fee'>
          {({ field }) => (
            <Input
              // value={field.value}
              // onChange={(e) => field.onChange(Number(e.target.value))}
              {...field}
              placeholder='Input admission fee'
              type='number'
              min={0}
            />
          )}
        </CommonFormField>
      </form>
    </Form>
  );
};

const classFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Class name is required' }),
  level: z.string().trim().min(1, { message: 'Level is required' }),

  monthlyFee: z.coerce
    .number({ invalid_type_error: 'Monthly fee must be a number' })
    .positive({ message: 'Monthly fee must be a positive number' }),

  admissionFee: z.coerce
    .number({ invalid_type_error: 'Admission fee must be a number' })
    .positive({ message: 'Admission fee must be a positive number' }),

  termFee: z.coerce
    .number({ invalid_type_error: 'Term fee must be a number' })
    .positive({ message: 'Term fee must be a positive number' }),
});

export type TClassForm = z.infer<typeof classFormSchema>;
