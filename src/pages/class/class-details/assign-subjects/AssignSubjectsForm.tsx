import { QK } from '@/api';
import { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormLabel } from '@/components/ui/form';
import { CommonFormField } from '@/components/shared/form';
import { Input } from '@/components/ui/input';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { getSubjects } from '@/api/query';

export const AssignedSubjectFormContainer = ({ classId, ...props }: TAssignSubjectsFormContainerProps) => {
  const { data: defaultValues, isLoading } = useQuery({
    queryKey: [QK.SUBJECT, { classId }],
    queryFn: () => getSubjects({ classId }),
    select: (res) => ({ subjects: res.data.map((subject) => ({ name: subject.name })) || [] }),
  });

  if (isLoading) return <AssignSubjectFormLoader />;

  return <AssignSubjectsForm {...props} defaultValues={defaultValues || { subjects: [{ name: '' }] }} />;
};

// form component
const AssignSubjectsForm = ({ formId, onSubmit, defaultValues }: TAssignSubjectsFormProps) => {
  const form = useForm<TAssignSubjectsForm>({
    resolver: zodResolver(assignSubjectFormSchema),
    defaultValues: defaultValues || { subjects: [{ name: '' }] },
  });

  const { append, remove, fields } = useFieldArray({ control: form.control, name: 'subjects' });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data, form.reset);
  });

  return (
    <Form {...form}>
      <form className='space-y-4 p-1' id={formId} onSubmit={handleSubmit}>
        <FormLabel>Subjects</FormLabel>
        <div className='flex flex-col gap-3'>
          {fields.map(({ id }, index) => (
            <CommonFormField key={id} control={form.control} name={`subjects.${index}.name`}>
              {({ field }) => (
                <div className='relative'>
                  <Input placeholder='Input Subject Name' className='pr-3' {...field} />
                  {fields.length > 1 && (
                    <button
                      className='absolute right-0 top-1/2 h-full -translate-y-1/2 rounded-r-md bg-destructive px-3 text-white hover:bg-destructive/70'
                      type='button'
                      onClick={() => remove(index)}
                    >
                      <Trash2Icon className='size-4' />
                    </button>
                  )}
                </div>
              )}
            </CommonFormField>
          ))}
        </div>
        <button
          onClick={() => append({ name: '' })}
          type='button'
          className='flex items-center gap-2 text-primary hover:border-b'
        >
          <PlusIcon className='size-4' /> Add Subject
        </button>
      </form>
    </Form>
  );
};

// loader
const AssignSubjectFormLoader = () => {
  return (
    <div className='space-y-2 p-1'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className='h-input w-full' />
      ))}
    </div>
  );
};

// schema
const assignSubjectFormSchema = z.object({
  subjects: z
    .array(z.object({ name: z.string().min(1, { message: 'Subject name is required' }) }))
    .min(1, { message: 'At least one subject is required' }),
});

// types
export type TAssignSubjectsForm = z.infer<typeof assignSubjectFormSchema>;
type TAssignSubjectsFormContainerProps = Omit<TAssignSubjectsFormProps, 'defaultValues'> & { classId: string };
export type TAssignSubjectFormSubmitFn = (data: TAssignSubjectsForm, reset: () => void) => void;

export type TAssignSubjectsFormProps = {
  formId: string;
  onSubmit: TAssignSubjectFormSubmitFn;
  defaultValues?: TAssignSubjectsForm;
};
