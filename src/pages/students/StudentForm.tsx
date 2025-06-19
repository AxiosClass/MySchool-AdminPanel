import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useGetClassListOptions, useGetClassroomListOptions } from '@/hooks';
import { CommonFormField, CommonSelect, DatePicker } from '../../components/shared/form';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BLOOD_GROUP } from '@/data';

type TStudentFormProps = {
  formId: string;
  onSubmit: (formData: TStudentForm, reset: () => void) => void;
  defaultValues: TStudentForm;
};

export const StudentForm = ({ formId, onSubmit, defaultValues }: TStudentFormProps) => {
  const form = useForm<TStudentForm>({ resolver: zodResolver(studentFormSchema), defaultValues: { ...defaultValues } });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form id={formId} className='grid grid-cols-2 gap-4 p-1' onSubmit={handleSubmit}>
        <CommonFormField control={form.control} name='name' label='Name'>
          {({ field }) => <Input {...field} placeholder='Input student name' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='birthId' label='Birth ID'>
          {({ field }) => <Input {...field} placeholder='Input birth ID' />}
        </CommonFormField>

        <ClassSelection />
        <ClassroomSelection />

        <CommonFormField control={form.control} name='bloodGroup' label='Blood Group'>
          {({ field }) => (
            <CommonSelect
              value={field.value}
              onChange={field.onChange}
              placeholder='Select blood group'
              options={bloodGroups}
            />
          )}
        </CommonFormField>
        <CommonFormField control={form.control} name='dob' label='Date of Birth'>
          {({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
        </CommonFormField>

        <CommonFormField formItemClassName='col-span-2' control={form.control} name='address' label='Address'>
          {({ field }) => <Textarea {...field} placeholder='Input address' />}
        </CommonFormField>

        <CommonFormField control={form.control} name='parents.fatherName' label='Father Name'>
          {({ field }) => <Input {...field} placeholder='Input father name' />}
        </CommonFormField>

        <CommonFormField control={form.control} name='parents.motherName' label='Mother Name'>
          {({ field }) => <Input {...field} placeholder='Input mother name' />}
        </CommonFormField>

        <CommonFormField control={form.control} name='guardian.name' label='Guardian Name'>
          {({ field }) => <Input {...field} placeholder='Input guardian name' />}
        </CommonFormField>

        <CommonFormField control={form.control} name='guardian.phone' label='Guardian Phone'>
          {({ field }) => <Input {...field} placeholder='Input guardian phone' />}
        </CommonFormField>

        <CommonFormField control={form.control} name='guardian.relation' label='Guardian Relation'>
          {({ field }) => <Input {...field} placeholder='Input guardian relation' />}
        </CommonFormField>
      </form>
    </Form>
  );
};

const ClassSelection = () => {
  const { control, setValue } = useFormContext<TStudentForm>();
  const { data: classes, isLoading } = useGetClassListOptions();

  return (
    <CommonFormField control={control} name='class' label='Class'>
      {({ field }) => (
        <CommonSelect
          value={field.value}
          onChange={(val) => {
            setValue('classroomId', '');
            field.onChange(val);
          }}
          placeholder='Select class'
          options={classes || []}
          isLoading={isLoading}
          disabled={isLoading}
        />
      )}
    </CommonFormField>
  );
};

const ClassroomSelection = () => {
  const { watch, control } = useFormContext<TStudentForm>();
  const selectedClass = watch('class');

  const { data: classrooms, isLoading } = useGetClassroomListOptions(selectedClass);

  return (
    <CommonFormField control={control} name='classroomId' label='Section'>
      {({ field }) => (
        <CommonSelect
          value={field.value}
          onChange={field.onChange}
          placeholder='Select classroom'
          options={classrooms || []}
          isLoading={isLoading}
          disabled={!selectedClass}
        />
      )}
    </CommonFormField>
  );
};

const bloodGroups = BLOOD_GROUP.map((bloodGroup) => ({ label: bloodGroup, value: bloodGroup }));

const studentFormSchema = z.object({
  name: z.string().min(1, { message: 'Student name is required' }),
  birthId: z.string().min(1, { message: 'Birth id is required' }),
  dob: z.date({ message: 'Invalid birth date' }),
  bloodGroup: z.string().min(1, { message: 'Blood group is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  parents: z.object({
    fatherName: z.string().min(1, { message: 'Father name is required' }),
    motherName: z.string().min(1, { message: 'Mother name is required' }),
  }),
  guardian: z.object({
    name: z.string().min(1, { message: 'Guardian name is required' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    relation: z.string().min(1, { message: 'Relation is required' }),
  }),
  class: z.string().min(1, { message: 'Class is required' }),
  classroomId: z.string().min(1, { message: 'Please assign a classroom' }),
});

export type TStudentForm = z.infer<typeof studentFormSchema>;
