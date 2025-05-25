import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CommonFormField } from '../form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaInput } from '../media';
import { z } from 'zod';

type TNoteFormProps = { formId: string; defaultValues?: TNoteForm; onSubmit: (data: TNoteForm) => void };

export const NoteForm = ({ formId, defaultValues, onSubmit }: TNoteFormProps) => {
  const form = useForm<TNoteForm>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: {
      title: defaultValues?.title,
      description: defaultValues?.description,
      files: { old: defaultValues?.files?.old || [], new: defaultValues?.files?.new || [] },
    },
  });

  const handleSubmit = form.handleSubmit((formData) => onSubmit(formData));

  return (
    <Form {...form}>
      <form id={formId} className='flex flex-col gap-3 p-1' onSubmit={handleSubmit}>
        <CommonFormField control={form.control} name='title' label='Title'>
          {({ field }) => <Input {...field} placeholder='Enter title' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='description' label='Description'>
          {({ field }) => <Textarea {...field} placeholder='Write a short description' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='files' label='Files'>
          {({ field }) => <MediaInput value={field.value} onChange={field.onChange} />}
        </CommonFormField>
      </form>
    </Form>
  );
};

// Schema
const FILE_SIZE = 1024 * 1024;
const addNoteFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  files: z.object({
    old: z.object({ id: z.string(), type: z.string(), url: z.string() }).array(),
    new: z.custom<File[]>(
      (value) => {
        if (!value || value.length === 0) return true;
        return value.length > 0 && value.every((file: File) => file.size <= FILE_SIZE);
      },
      { message: 'File size must be less than 1MB' },
    ),
  }),
});

export type TNoteForm = z.infer<typeof addNoteFormSchema>;
