import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTeacherMutation } from '@/data-fetching/hooks/teacher';

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

type TAddTeacherFormSchema = z.infer<typeof addTeacherFormSchema>;

const defaultValues = {
  teacherId: '',
  name: '',
  nid: '',
  phone: '',
  dob: new Date(),
  bloodGroup: '',
  salary: '',
  address: '',
  education: { degree: '', group: '', result: '' },
};

export const useAddTeacher = () => {
  const form = useForm<TAddTeacherFormSchema>({ resolver: zodResolver(addTeacherFormSchema), defaultValues });

  const { addTeacherMutation, isLoading } = useAddTeacherMutation();

  const [isOpen, setIsOpen] = useState(false);
  const handleAddTeacher = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Teacher!');
    const { teacherId, dob, salary } = formData;

    tryCatch({
      id,
      tryFn: async () => {
        const response = await addTeacherMutation.mutateAsync({
          ...formData,
          id: teacherId,
          dob: dob.toISOString(),
          salary: Number(salary),
        });

        toast.success(response.message, { id });
        setIsOpen(false);
      },
    });
  });

  return { form, handlers: { handleAddTeacher }, states: { isLoading, isOpen, setIsOpen } };
};
