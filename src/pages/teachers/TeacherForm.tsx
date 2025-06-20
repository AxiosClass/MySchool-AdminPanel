import { CommonFormField, CommonSelect, DatePicker } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BLOOD_GROUP } from '@/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TTeacherFormProps = {
  formId: string;
  onSubmit: (formData: TTeacherForm, reset: () => void) => void;
  defaultValues: Partial<TTeacherForm>;
  isUpdate?: boolean;
};
export const TeacherForm = ({ formId, onSubmit, defaultValues, isUpdate }: TTeacherFormProps) => {
  const schema = isUpdate ? teacherFormSchema.partial() : teacherFormSchema;
  const form = useForm<TTeacherForm>({ resolver: zodResolver(schema), defaultValues });

  const { control } = form;

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form id={formId} onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 p-1'>
        <CommonFormField control={control} name='name' label='Name'>
          {({ field }) => <Input {...field} placeholder='Input teacher name' />}
        </CommonFormField>

        <CommonFormField control={control} name='id' label='Teacher ID'>
          {({ field }) => <Input {...field} placeholder='Input teacher ID' disabled={isUpdate} />}
        </CommonFormField>

        <CommonFormField control={control} name='nid' label='NID'>
          {({ field }) => <Input {...field} placeholder='Input NID' />}
        </CommonFormField>

        <CommonFormField control={control} name='phone' label='Phone Number'>
          {({ field }) => <Input {...field} placeholder='Input phone number' />}
        </CommonFormField>

        <CommonFormField control={control} name='dob' label='Date of Birth'>
          {({ field: { value, onChange } }) => <DatePicker value={value} onChange={onChange} />}
        </CommonFormField>

        <CommonFormField control={control} name='bloodGroup' label='Blood Group'>
          {({ field: { value, onChange } }) => (
            <CommonSelect value={value} onChange={onChange} placeholder='Select blood group' options={bloodGroups} />
          )}
        </CommonFormField>

        <CommonFormField formItemClassName='col-span-2' control={control} name='address' label='Address'>
          {({ field }) => <Textarea {...field} placeholder='Input address' />}
        </CommonFormField>

        <CommonFormField control={control} name='salary' label='Salary'>
          {({ field }) => <Input {...field} placeholder='Input salary' type='number' />}
        </CommonFormField>

        <CommonFormField control={control} name='education.degree' label='Degree Name'>
          {({ field }) => <Input {...field} placeholder='Input degree name' />}
        </CommonFormField>

        <CommonFormField control={control} name='education.passedYear' label='Passed Year'>
          {({ field }) => <Input {...field} placeholder='Input passed year' />}
        </CommonFormField>
      </form>
    </Form>
  );
};

// const
const bloodGroups = BLOOD_GROUP.map((bloodGroup) => ({ label: bloodGroup, value: bloodGroup }));

// schemas
const teacherFormSchema = z.object({
  id: z.string().trim().min(1, { message: 'Teacher id is required' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  nid: z.string().trim().min(1, { message: 'Nid is required' }),
  phone: z.string().trim().min(1, { message: 'Phone Number is required' }),
  dob: z.date({ message: 'Invalid date' }),
  bloodGroup: z.string().min(1, { message: 'Blood Group is required' }),
  salary: z.coerce.number().min(1, { message: 'Salary is required' }),
  address: z.string().trim().min(1, { message: 'Address is required' }),
  education: z.object({
    degree: z.string().trim().min(1, { message: 'Degree Name is required' }),
    passedYear: z.string().trim().min(4, { message: 'Invalid year' }),
  }),
});

// types
export type TTeacherForm = z.infer<typeof teacherFormSchema>;
