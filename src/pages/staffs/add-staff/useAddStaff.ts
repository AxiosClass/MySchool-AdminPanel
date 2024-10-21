import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addTeacherFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  nid: z.string().min(1, { message: 'Nid is required' }),
  phone: z.string().min(1, { message: 'Phone Number is required' }),
  dob: z.date(),
  bloodGroup: z.string().min(1, { message: 'Blood Group is required' }),
  salary: z.string().min(1, { message: 'Salary is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  education: z.object({
    degreeName: z.string().min(1, { message: 'Degree Name is required' }),
    group: z.string().min(1, { message: 'Group is required' }),
    result: z.string().min(1, { message: 'Result is required' }),
  }),
  role: z.string().min(1, { message: 'Role is required' }),
  userId: z.string().min(1, { message: 'userId is required' }),
});

const defaultValues = {
  name: '',
  nid: '',
  phone: '',
  dob: undefined,
  bloodGroup: '',
  salary: '',
  designation: '',
  address: '',
  education: { degreeName: '', group: '', result: '' },
  role: '',
  userId: '',
};

export const useAddStaff = () => {
  const form = useForm<z.infer<typeof addTeacherFormSchema>>({
    resolver: zodResolver(addTeacherFormSchema),
    defaultValues,
  });

  const handleAddStaff = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return { form, handleAddStaff };
};
