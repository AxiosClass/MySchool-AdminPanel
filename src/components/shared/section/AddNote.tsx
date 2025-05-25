import { QK } from '@/api';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { PlusIcon } from 'lucide-react';
import { CommonFormField, FormSheet } from '../form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TMedia } from '@/lib/types';
import { MediaInput } from '../media';

const formId = QK.NOTE + '_ADD';
type TAddNoteProps = { sectionId: string };

export const AddNote = ({ sectionId }: TAddNoteProps) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <>
      <Button variant='outline' onClick={() => onOpenChange(true)}>
        <PlusIcon size={16} />
        Add Note
      </Button>
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Note'
        description='Provide the following information to add note'
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <AddNoteForm sectionId={sectionId} />
      </FormSheet>
    </>
  );
};

type TAddNoteFormProps = { sectionId: string };

const AddNoteForm = ({ sectionId }: TAddNoteFormProps) => {
  const form = useForm<TAddNoteForm>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: { title: '', description: '', files: [] },
  });

  console.log(sectionId);

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

// Schema
const FILE_SIZE = 1024 * 1024;
const addNoteFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  files: z
    .custom<Array<File | TMedia>>()
    .refine(
      (value) => value.every((file) => file instanceof File && file.size > FILE_SIZE),
      'File size must be less than 1mb',
    ),
});

type TAddNoteForm = z.infer<typeof addNoteFormSchema>;
