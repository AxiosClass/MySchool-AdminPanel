import { CommonFormField } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TTermFormProps = { formId: string; onSubmit: (formData: TTermForm, reset: () => void) => void; termName?: string };

export const TermForm = ({ formId, onSubmit, termName = '' }: TTermFormProps) => {
  const form = useForm<TTermForm>({ resolver: zodResolver(termSchema), defaultValues: { name: termName } });

  const handleSubmit = form.handleSubmit((formData) => onSubmit(formData, () => form.reset()));

  return (
    <Form {...form}>
      <form id={formId} onSubmit={handleSubmit}>
        <CommonFormField control={form.control} name='name' label='Name'>
          {({ field }) => <Input placeholder='Enter name' {...field} />}
        </CommonFormField>
      </form>
    </Form>
  );
};

const termSchema = z.object({ name: z.string().min(1, 'Name is required') });
export type TTermForm = z.infer<typeof termSchema>;
