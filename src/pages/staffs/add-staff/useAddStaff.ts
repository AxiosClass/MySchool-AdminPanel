import {
  ADD_STAFF_WITH_USER_ACCOUNT,
  ADD_STAFF_WITHOUT_USER_ACCOUNT,
  GET_STAFFS,
  IAddStaffResponse,
  TAddStaffWithOutUserAccount,
  TAddStaffWithUserAccount,
} from '@/lib/queries';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { EUserRole } from '@/lib/types';
import { clientFetch, tryCatch } from '@/helpers';
import { toast } from 'sonner';
import { z } from 'zod';
import { apiUrl } from '@/data/api-url';

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
  userId: z.string(),
});

const defaultValues = {
  name: '',
  nid: '',
  phone: '',
  dob: new Date(),
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

  const [addStaffWithoutAccount, { loading: isAddStaffWithoutAccountLoading }] =
    useMutation<IAddStaffResponse, TAddStaffWithOutUserAccount>(
      ADD_STAFF_WITHOUT_USER_ACCOUNT,
      { refetchQueries: [GET_STAFFS] },
    );

  const [addStaffWithAccount, { loading: isAddStaffWithAccountLoading }] =
    useMutation<IAddStaffResponse, TAddStaffWithUserAccount>(
      ADD_STAFF_WITH_USER_ACCOUNT,
      { refetchQueries: [GET_STAFFS] },
    );

  const handleAddStaff = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding staff');

    // simple validation
    if (formData.role !== 'other' && !formData.userId)
      return form.setError('userId', { message: 'Staff id is required' });

    tryCatch({
      id,
      async tryFn() {
        const {
          name,
          userId,
          nid,
          phone,
          dob,
          bloodGroup,
          address,
          salary,
          designation,
          education,
          role,
        } = formData;
        //  checking the role
        // create new staff with no account
        if (formData.role === 'other') {
          const response = await addStaffWithoutAccount({
            variables: {
              name,
              nid,
              phone,
              dob,
              bloodGroup,
              address,
              salary: Number(salary),
              designation,
              education: JSON.stringify(education),
            },
          });
          if (!response.data?.insert_staffs_one?.id)
            throw new Error('Failed to add staff');

          toast.success('Staff Added Successfully!', { id });
          form.reset();
          return;
        }

        // when role is not other
        // sending api request to the server
        const hashResponse = await clientFetch({
          url: apiUrl.hashPassword,
          method: 'POST',
          body: { password: nid },
        });
        const password = hashResponse.password;

        const response = await addStaffWithAccount({
          variables: {
            name,
            nid,
            phone,
            dob,
            bloodGroup,
            address,
            salary: Number(salary),
            designation,
            education: JSON.stringify(education),
            role: role as EUserRole,
            userId,
            password,
          },
        });

        if (!response.data?.insert_staffs_one.id)
          throw new Error('Failed to add staff');

        toast.success('Staff added successfully', { id });
        form.reset();
      },
    });
  });

  return {
    form,
    handleAddStaff,
    isLoading: isAddStaffWithoutAccountLoading || isAddStaffWithAccountLoading,
  };
};
