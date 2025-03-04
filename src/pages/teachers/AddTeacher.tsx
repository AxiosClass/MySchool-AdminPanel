import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { addTeacher } from '@/api/query';
import { useForm } from 'react-hook-form';
import { BLOOD_GROUP } from '@/data';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormSheet, CommonSelect, DatePicker, CommonFormField } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionButton } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const AddTeacher = () => {
  const formId = QK.TEACHER + '_CREATE';
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const form = useForm<TAddTeacherForm>({
    resolver: zodResolver(addTeacherFormSchema),
    defaultValues: {
      teacherId: '',
      name: '',
      nid: '',
      phone: '',
      dob: new Date(),
      bloodGroup: '',
      salary: '',
      address: '',
      education: { degree: '', passedYear: '' },
    },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addTeacher,
    onSuccess: (res) => {
      toast.success(res.message);
      onOpenChange(false);
      qc.invalidateQueries({ queryKey: [QK.TEACHER] });
    },
  });

  const handleAddTeacher = form.handleSubmit((formData) => {
    const { teacherId, dob, salary } = formData;
    mutate({ ...formData, id: teacherId, dob: dob.toISOString(), salary: Number(salary) });
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Add Teacher' onClick={() => onOpenChange(true)} />
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        formId={formId}
        title='Add Teacher'
        description='Please enter the teacher details'
        submitButtonTitle='Add Teacher'
        submitLoadingTitle='Adding...'
      >
        <Form {...form}>
          <form id={formId} onSubmit={handleAddTeacher} className='grid grid-cols-2 gap-4 p-1'>
            <CommonFormField control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input teacher name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='teacherId' label='Teacher ID'>
              {({ field }) => <Input {...field} placeholder='Input teacher ID' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='nid' label='NID'>
              {({ field }) => <Input {...field} placeholder='Input NID' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='phone' label='Phone Number'>
              {({ field }) => <Input {...field} placeholder='Input phone number' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='dob' label='Date of Birth'>
              {({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
            </CommonFormField>
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
            <CommonFormField
              className={{ formItem: 'col-span-2' }}
              control={form.control}
              name='address'
              label='Address'
            >
              {({ field }) => <Textarea {...field} placeholder='Input address' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='salary' label='Salary'>
              {({ field }) => <Input {...field} placeholder='Input salary' type='number' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='education.degree' label='Degree Name'>
              {({ field }) => <Input {...field} placeholder='Input degree name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='education.passedYear' label='Passed Year'>
              {({ field }) => <Input {...field} placeholder='Input passed year' />}
            </CommonFormField>
          </form>
        </Form>
      </FormSheet>
    </>
  );
};

// const
const bloodGroups = BLOOD_GROUP.map((bloodGroup) => ({ label: bloodGroup, value: bloodGroup }));

// schemas
const addTeacherFormSchema = z.object({
  teacherId: z.string().min(1, { message: 'Teacher id is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  nid: z.string().min(1, { message: 'Nid is required' }),
  phone: z.string().min(1, { message: 'Phone Number is required' }),
  dob: z.date({ message: 'Invalid date' }),
  bloodGroup: z.string().min(1, { message: 'Blood Group is required' }),
  salary: z.string().min(1, { message: 'Salary is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  education: z.object({
    degree: z.string().min(1, { message: 'Degree Name is required' }),
    passedYear: z.string().min(4, { message: 'Invalid year' }),
  }),
});

// types
type TAddTeacherForm = z.infer<typeof addTeacherFormSchema>;
