import { z } from 'zod';
import { NOTICE_FOR } from '@/lib/types';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonFormField, CommonSelect } from '@/components/shared/form';

export const NoticeForm = ({ formId, defaultValues, onSubmit }: TNoticeFormProps) => {
  const form = useForm<TNoticeForm>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: defaultValues || { title: '', description: '', noticeFor: '' },
  });

  return (
    <Form {...form}>
      <form id={formId} className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormField control={form.control} name='title' label='Title'>
          {({ field }) => <Input {...field} placeholder='Enter title' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='description' label='Description'>
          {({ field }) => <Textarea {...field} placeholder='Enter description' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='noticeFor' label='Notice For'>
          {({ field }) => (
            <CommonSelect
              options={noticeForOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder='Select any'
            />
          )}
        </CommonFormField>
      </form>
    </Form>
  );
};

//consts
const noticeForOptions = Object.keys(NOTICE_FOR).map((key) => ({ label: key, value: key }));
// schema
const noticeFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  noticeFor: z.string().min(1, { message: 'Please select who is going to see notice' }),
});

// types
export type TNoticeForm = z.infer<typeof noticeFormSchema>;
type TNoticeFormProps = { formId: string; defaultValues?: TNoticeForm; onSubmit: (data: TNoticeForm) => void };
