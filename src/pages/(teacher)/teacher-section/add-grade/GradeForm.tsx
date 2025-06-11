import { CommonFormField } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SUBJECT_TYPE } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

type TGradeFormProps = {
  subjectType: SUBJECT_TYPE;
  marks?: Record<string, number>;
  onSubmit: (data: TGradeForm, reset: () => void) => void;
};

export const GradeForm = ({ subjectType, marks, onSubmit }: TGradeFormProps) => {
  const form = useForm<TGradeForm>({
    resolver: zodResolver(generateGradeSchema(subjectType)),
    defaultValues: { marks: marks ?? {} },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {subjectType === SUBJECT_TYPE.CQ_MCQ && <CQ_MCQForm />}
        {subjectType === SUBJECT_TYPE.CQ_MCQ_PRACTICAL && <CQ_MCQ_PracticalForm />}
        {(subjectType === SUBJECT_TYPE.WRITTEN_FULL || subjectType === SUBJECT_TYPE.WRITTEN_HALF) && <WrittenForm />}
      </form>
    </Form>
  );
};

const CQ_MCQForm = () => {
  const { control } = useFormContext<TCqMcqForm>();

  return (
    <>
      <CommonFormField control={control} name='marks.cq' label='CQ'>
        {({ field }) => (
          <Input
            value={field.value ?? ''}
            onChange={(e) => Number(field.onChange(e.target.value))}
            placeholder='Input CQ marks'
            type='number'
          />
        )}
      </CommonFormField>
      <CommonFormField control={control} name='marks.mcq' label='MCQ'>
        {({ field }) => (
          <Input
            value={field.value ?? ''}
            onChange={(e) => Number(field.onChange(e.target.value))}
            placeholder='Input CQ marks'
            type='number'
          />
        )}
      </CommonFormField>
    </>
  );
};

const CQ_MCQ_PracticalForm = () => {
  const { control } = useFormContext<TCqMcqPracticalForm>();

  return (
    <>
      <CommonFormField control={control} name='marks.cq' label='CQ'>
        {({ field }) => (
          <Input
            value={field.value ?? ''}
            onChange={(e) => Number(field.onChange(e.target.value))}
            placeholder='Input CQ marks'
            type='number'
          />
        )}
      </CommonFormField>
      <CommonFormField control={control} name='marks.mcq' label='MCQ'>
        {({ field }) => (
          <Input
            value={field.value ?? ''}
            onChange={(e) => Number(field.onChange(e.target.value))}
            placeholder='Input CQ marks'
            type='number'
          />
        )}
      </CommonFormField>
      <CommonFormField control={control} name='marks.practical' label='Practical'>
        {({ field }) => (
          <Input
            value={field.value ?? ''}
            onChange={(e) => Number(field.onChange(e.target.value))}
            placeholder='Input CQ marks'
            type='number'
          />
        )}
      </CommonFormField>
    </>
  );
};

const WrittenForm = () => {
  const { control } = useFormContext<TWrittenForm>();

  return (
    <CommonFormField control={control} name='marks.written' label='Written'>
      {({ field }) => (
        <Input
          value={field.value ?? ''}
          onChange={(e) => Number(field.onChange(e.target.value))}
          placeholder='Input CQ marks'
          type='number'
        />
      )}
    </CommonFormField>
  );
};

// Schema
const gradeBaseFormSchema = z.object({ marks: z.record(z.string(), z.number().positive()) });

const cqMcqSchema = gradeBaseFormSchema.extend({
  marks: z.object({
    cq: z.number().positive().max(70, { message: 'Marks cannot exceed 70' }),
    mcq: z.number().positive().max(30, { message: 'Marks cannot exceed 30' }),
  }),
});

const cqMcqPracticalSchema = gradeBaseFormSchema.extend({
  marks: z.object({
    cq: z.number().positive().max(50, { message: 'Marks cannot exceed 50' }),
    mcq: z.number().positive().max(25, { message: 'Marks cannot exceed 25' }),
    practical: z.number().positive().max(25, { message: 'Marks cannot exceed 25' }),
  }),
});

const writtenFullSchema = gradeBaseFormSchema.extend({
  marks: z.object({
    written: z.number().positive().max(100, { message: 'Marks cannot exceed 100' }),
  }),
});

const writtenHalfSchema = gradeBaseFormSchema.extend({
  marks: z.object({
    written: z.number().positive().max(50, { message: 'Marks cannot exceed 50' }),
  }),
});

const generateGradeSchema = (subjectType: SUBJECT_TYPE) => {
  switch (subjectType) {
    case SUBJECT_TYPE.CQ_MCQ:
      return cqMcqSchema;
    case SUBJECT_TYPE.CQ_MCQ_PRACTICAL:
      return cqMcqPracticalSchema;
    case SUBJECT_TYPE.WRITTEN_FULL:
      return writtenFullSchema;
    case SUBJECT_TYPE.WRITTEN_HALF:
      return writtenHalfSchema;
    default:
      return gradeBaseFormSchema;
  }
};

// types
export type TGradeForm = z.infer<ReturnType<typeof generateGradeSchema>>;
type TCqMcqForm = z.infer<typeof cqMcqSchema>;
type TCqMcqPracticalForm = z.infer<typeof cqMcqPracticalSchema>;
type TWrittenFullForm = z.infer<typeof writtenFullSchema>;
type TWrittenHalfForm = z.infer<typeof writtenHalfSchema>;
type TWrittenForm = TWrittenFullForm | TWrittenHalfForm;
