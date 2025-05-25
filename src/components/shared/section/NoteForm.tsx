import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CommonFormField } from '../form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { MediaInput } from '../media';

// Schema
const FILE_SIZE = 1024 * 1024;
const addNoteFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  files: z.object({
    old: z.object({ id: z.string(), type: z.string(), url: z.string() }).array(),
    new: z.custom<File[]>(
      (value) => value.length > 0 && value.every((file: File) => file.size <= FILE_SIZE),
      'File size must be less than 1MB',
    ),
  }),
});

type TNoteForm = z.infer<typeof addNoteFormSchema>;

type TNoteFormProps = { formId: string; defaultValues?: TNoteForm };

export const NoteForm = ({ formId, defaultValues }: TNoteFormProps) => {
  const form = useForm<TNoteForm>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: {
      title: defaultValues?.title,
      description: defaultValues?.description,
      files: { old: defaultValues?.files.old || [], new: [] },
    },
  });

  return (
    <Form {...form}>
      <form id={formId} className='flex flex-col gap-3 p-1'>
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
