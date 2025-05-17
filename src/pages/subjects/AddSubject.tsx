import { z } from 'zod';
import { QK } from '@/api';
import { TooltipContainer } from '@/components/shared';
import { CommonFormField, CommonSelect, FormSheet } from '@/components/shared/form';
import { useFieldArray, UseFieldArrayRemove, useForm, useFormContext } from 'react-hook-form';
import { ActionButton, Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { usePopupState } from '@/hooks';
import { SUBJECT_TYPE } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubject } from '@/api/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helpers';

// Consts
const formId = QK.SUBJECTS + '_ADD_';

const subSubjectTypeOptions = [
  { label: 'CQ-70 + MCQ-30 = 100', value: SUBJECT_TYPE.CQ_MCQ },
  { label: 'CQ-50 + MCQ-25 + Practical-25 = 100', value: SUBJECT_TYPE.CQ_MCQ_PRACTICAL },
  { label: 'Written = 100', value: SUBJECT_TYPE.WRITTEN_FULL },
  { label: 'Written = 50', value: SUBJECT_TYPE.WRITTEN_HALF },
];

const subjectTypeOptions = [
  ...subSubjectTypeOptions,
  { label: 'Combined (1st Paper, 2nd Paper)', value: SUBJECT_TYPE.COMBINED },
];

export const AddSubject = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: createSubject,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.SUBJECTS] });
      onOpenChange(false);
    },
    onError: (error) => errorMessageGen(error),
  });

  const handleAddSubject = (formData: TAddSubjectForm) => {
    const { name, type, description, children } = formData;

    if (type === SUBJECT_TYPE.COMBINED && (!children?.length || children.length < 2)) {
      toast.error('Please add at least two sub subjects');
      return;
    }

    mutate({ name, type, ...(description && { description }), ...(children?.length && { children }) });
  };

  return (
    <>
      <ActionButton label='Add Subject' actionType='ADD' onClick={() => onOpenChange(true)} />
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Subject'
        description='Provide following information to create a new subject'
        submitButtonTitle='Create'
        submitLoadingTitle='Creating...'
      >
        <AddSubjectForm onSubmit={handleAddSubject} />
      </FormSheet>
    </>
  );
};

type TAddSubjectFormProps = { onSubmit: (formData: TAddSubjectForm) => void };

const AddSubjectForm = ({ onSubmit }: TAddSubjectFormProps) => {
  const form = useForm<TAddSubjectForm>({
    resolver: zodResolver(addSubjectFormSchema),
    defaultValues: { name: '', description: '', type: SUBJECT_TYPE.CQ_MCQ },
  });

  const { control, watch } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'children' });
  const watchedType = watch('type');

  const handleAddChildren = () => {
    append({ name: '', type: SUBJECT_TYPE.CQ_MCQ });
  };

  const handleSubmit = form.handleSubmit((formData) => onSubmit(formData));

  return (
    <Form {...form}>
      <form id={formId} onSubmit={handleSubmit} className='flex flex-col gap-4 p-1'>
        <div className='flex items-center gap-4'>
          <CommonFormField control={control} name='name' label='Name' className={{ formItem: 'w-full' }}>
            {({ field }) => <Input {...field} placeholder='Input Subject Name' />}
          </CommonFormField>
          <CommonFormField control={control} name='type' label='Subject Type' className={{ formItem: 'w-full' }}>
            {({ field }) => <CommonSelect value={field.value} onChange={field.onChange} options={subjectTypeOptions} />}
          </CommonFormField>
        </div>
        <CommonFormField control={control} name='description' label='Description'>
          {({ field }) => <Textarea {...field} placeholder='Input Subject Name' />}
        </CommonFormField>

        {watchedType === SUBJECT_TYPE.COMBINED && (
          <>
            {fields.map(({ id }, index) => (
              <SubSubjectField key={id} index={index} remove={remove} />
            ))}

            <div className='flex items-center gap-2'>
              <div className='h-[1.5px] w-full bg-input' />
              <TooltipContainer label='Add Sub Subject'>
                <button
                  type='button'
                  onClick={handleAddChildren}
                  className='rounded-full border border-input p-2 transition-colors hover:bg-primary hover:text-white'
                >
                  <PlusIcon size={16} />
                </button>
              </TooltipContainer>
              <div className='h-[1.5px] w-full bg-input' />
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

type TSubSubjectFieldProps = { index: number; remove: UseFieldArrayRemove };

const SubSubjectField = ({ index, remove }: TSubSubjectFieldProps) => {
  const { control } = useFormContext<TAddSubjectForm>();

  return (
    <div className='flex gap-4'>
      <CommonFormField
        control={control}
        name={`children.${index}.name`}
        label='Name'
        className={{ formItem: 'w-full' }}
      >
        {({ field }) => <Input {...field} placeholder='Input Subject Name' />}
      </CommonFormField>
      <CommonFormField
        control={control}
        name={`children.${index}.type`}
        label='Subject Type'
        className={{ formItem: 'w-full' }}
      >
        {({ field }) => <CommonSelect value={field.value} onChange={field.onChange} options={subjectTypeOptions} />}
      </CommonFormField>
      <div className='mt-6'>
        <TooltipContainer label='Remove Sub Subject'>
          <Button type='button' onClick={() => remove(index)} variant='destructive'>
            <TrashIcon size={16} />
          </Button>
        </TooltipContainer>
      </div>
    </div>
  );
};

// Schemas
const subjectSubSchema = z.object({
  name: z.string().min(1, 'Subject name is required'),
  description: z.string().optional(),
  type: z.nativeEnum(SUBJECT_TYPE),
});

const addSubjectFormSchema = subjectSubSchema.extend({
  children: subjectSubSchema.array().optional(),
});

// Types
type TAddSubjectForm = z.infer<typeof addSubjectFormSchema>;
