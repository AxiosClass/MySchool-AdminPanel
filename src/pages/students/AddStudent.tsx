import { z } from 'zod';
import { QK } from '@/api';
import { usePopupState } from '@/hooks';
import { CommonFormField, CommonSelect, DatePicker, FormSheet } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form } from '@/components/ui/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStudent, getClassList, getClassroomList } from '@/api/query';
import { BLOOD_GROUP } from '@/data';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helpers';

export const AddStudent = () => {
  const formId = QK.STUDENT + '_CREATE';
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  // form
  const form = useForm<TAddStudentForm>({
    resolver: zodResolver(addStudentFormSchema),
    defaultValues: {
      name: '',
      birthId: '',
      class: '',
      classroomId: '',
      bloodGroup: '',
      parents: { fatherName: '', motherName: '' },
      guardian: { name: '', phone: '', relation: '' },
      address: '',
      dob: new Date(),
    },
  });

  // watch
  const selectedClass = form.watch('class');

  // data fetching
  const { data: classes, isLoading: isClassDataLoading } = useQuery({
    queryKey: [QK.CLASS, 'LIST'],
    queryFn: getClassList,
    select: (res) => res.data.map(({ level, name }) => ({ label: name, value: level })),
  });

  const { data: classrooms, isLoading: isClassroomDataLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { classId: selectedClass }],
    queryFn: () => getClassroomList(selectedClass),
    select: (res) => res.data.map(({ id, name }) => ({ label: name, value: id })),
    enabled: !!selectedClass,
  });

  // mutation
  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addStudent,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.STUDENT] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  // handler
  const handleAddStudent = form.handleSubmit((formData) => mutate({ ...formData }));

  return (
    <>
      <ActionButton actionType='ADD' label='Add Student' onClick={() => onOpenChange(true)} />
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Student'
        description='Please fill the form below to add a new student'
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <Form {...form}>
          <form id={formId} className='grid grid-cols-2 gap-4 p-1' onSubmit={handleAddStudent}>
            <CommonFormField control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input student name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='birthId' label='Birth ID'>
              {({ field }) => <Input {...field} placeholder='Input birth ID' />}
            </CommonFormField>

            <CommonFormField control={form.control} name='class' label='Class'>
              {({ field }) => (
                <CommonSelect
                  value={field.value}
                  onChange={(val) => {
                    form.setValue('classroomId', '');
                    field.onChange(val);
                  }}
                  placeholder='Select class'
                  options={classes || []}
                  isLoading={isClassDataLoading}
                />
              )}
            </CommonFormField>

            <CommonFormField control={form.control} name='classroomId' label='Classroom'>
              {({ field }) => (
                <CommonSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Select classroom'
                  options={classrooms || []}
                  isLoading={isClassroomDataLoading}
                  disabled={!selectedClass}
                />
              )}
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
            <CommonFormField control={form.control} name='dob' label='Date of Birth'>
              {({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
            </CommonFormField>

            <CommonFormField
              className={{ formItem: 'col-span-2' }}
              control={form.control}
              name='address'
              label='Address'
            >
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
      </FormSheet>
    </>
  );
};

// const
const bloodGroups = BLOOD_GROUP.map((bloodGroup) => ({ label: bloodGroup, value: bloodGroup }));

// schema
const addStudentFormSchema = z.object({
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

// types
type TAddStudentForm = z.infer<typeof addStudentFormSchema>;
