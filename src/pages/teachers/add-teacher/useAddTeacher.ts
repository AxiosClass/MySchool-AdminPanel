import {
  ADD_TEACHER,
  IAddTeacherResponse,
  TAddTeacherPayload,
} from '@/lib/queries';

import { zodResolver } from '@hookform/resolvers/zod';
import { clientFetch, tryCatch } from '@/helpers';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { apiUrl } from '@/data';
import { z } from 'zod';

const addTeacherFormSchema = z.object({
  teacherId: z.string().min(1, { message: 'Teacher id is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  nid: z.string().min(1, { message: 'Nid is required' }),
  phone: z.string().min(1, { message: 'Phone Number is required' }),
  dob: z.date(),
  bloodGroup: z.string().min(1, { message: 'Blood Group is required' }),
  salary: z.string().min(1, { message: 'Salary is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  education: z.object({
    degreeName: z.string().min(1, { message: 'Degree Name is required' }),
    group: z.string().min(1, { message: 'Group is required' }),
    result: z.string().min(1, { message: 'Result is required' }),
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
  education: { degreeName: '', group: '', result: '' },
};

export const useAddTeacher = () => {
  const form = useForm<TAddTeacherFormSchema>({
    resolver: zodResolver(addTeacherFormSchema),
    defaultValues,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const [addTeacher, { loading: isLoading }] = useMutation<
    IAddTeacherResponse,
    TAddTeacherPayload
  >(ADD_TEACHER);

  const handleAddTeacher = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Teacher!');

    tryCatch({
      id,
      async tryFn() {
        setIsApiLoading(true);

        const {
          name,
          teacherId,
          nid,
          phone,
          dob,
          bloodGroup,
          address,
          salary,
          education,
        } = formData;

        const hashResponse = await clientFetch({
          url: apiUrl.hashPassword,
          method: 'POST',
          body: { password: nid },
        });
        const password = hashResponse.password;

        await addTeacher({
          variables: {
            name,
            id: teacherId,
            nid,
            phone,
            dob,
            bloodGroup,
            address,
            salary: Number(salary),
            education: JSON.stringify(education),
            password,
          },
        });

        toast.success('Teacher added', { id });
        setIsOpen(false);
      },

      finallyFn() {
        setIsApiLoading(false);
      },
    });
  });

  return {
    form,
    handleAddTeacher,
    isLoading: isLoading || isApiLoading,
    isOpen,
    setIsOpen,
  };
};
