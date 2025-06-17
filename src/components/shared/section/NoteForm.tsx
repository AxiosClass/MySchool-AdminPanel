import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CommonFormField, CommonSelect } from '../form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaInput } from '../media';
import { z } from 'zod';
import { useGetTeacherSubjects } from '@/hooks';
import { useMemo } from 'react';

type TNoteFormProps = {
  formId: string;
  defaultValues?: TNoteForm;
  sectionId: string;
  onSubmit: (data: TNoteForm) => void;
};

export const NoteForm = ({ formId, defaultValues, sectionId, onSubmit }: TNoteFormProps) => {
  const form = useForm<TNoteForm>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
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
          {({ field }) => <Textarea {...field} placeholder='Write a short description' rows={4} />}
        </CommonFormField>
        <CommonFormField control={form.control} name='subjectId' label='Subject'>
          {({ field }) => (
            <SubjectSelection sectionId={sectionId} value={field.value || ''} onChange={field.onChange} />
          )}
        </CommonFormField>
        <CommonFormField control={form.control} name='files' label='Files'>
          {({ field }) => <MediaInput value={field.value} onChange={field.onChange} />}
        </CommonFormField>
      </form>
    </Form>
  );
};

type TSubjectSelectionProps = { sectionId: string; value: string; onChange: (value: string) => void };
const SubjectSelection = ({ sectionId, value, onChange }: TSubjectSelectionProps) => {
  const { data: subjects, isLoading } = useGetTeacherSubjects(sectionId);

  const subjectOptions = useMemo(() => {
    return subjects?.map(({ id, name }) => ({ label: name, value: id })) || [];
  }, [subjects]);

  return <CommonSelect options={subjectOptions} value={value} onChange={onChange} isLoading={isLoading} />;
};

// Schema
const FILE_SIZE = 1024 * 1024;

// Sub Schema
const oldFileSchema = z.object({
  id: z.string({ required_error: 'File ID is required' }),
  type: z.string({ required_error: 'File type is required' }),
  url: z.string({ required_error: 'File URL is required' }).url('Invalid URL'),
});

const newFilesSchema = z.custom<File[]>(
  (value) => {
    if (!Array.isArray(value)) return false;
    if (value.length === 0) return true; // allow empty
    return value.every((file) => file instanceof File && file.size <= FILE_SIZE);
  },
  { message: 'Each file must be under 1MB' },
);

const addNoteFormSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).trim().min(1, 'Title cannot be empty'),
  description: z.string().trim().min(1, { message: 'Description can not be empty' }),
  subjectId: z.string().uuid({ message: 'Please select an subject' }).optional(),

  files: z.object({
    old: z.array(oldFileSchema).default([]),
    new: newFilesSchema.default([]),
  }),
});

export type TNoteForm = z.infer<typeof addNoteFormSchema>;
