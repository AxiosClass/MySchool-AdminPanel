import {
  ADD_STAFF_WITH_USER_ACCOUNT,
  ADD_STAFF_WITHOUT_USER_ACCOUNT,
  GET_STAFFS,
  IAddStaffResponse,
  TAddStaffWithOutUserAccount,
  TAddStaffWithUserAccount,
} from '@/lib/queries';

import { zodResolver } from '@hookform/resolvers/zod';
import { clientFetch, tryCatch } from '@/helpers';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { EUserRole } from '@/lib/types';
import { apiUrl } from '@/data';
import { toast } from 'sonner';
import { z } from 'zod';

const addStaffFormSchema = z.object({
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
  staffId: z.string().min(1, { message: 'StaffId is required' }),
});

type TAddStaffFormSchema = z.infer<typeof addStaffFormSchema>;

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
  staffId: '',
};

export const useAddStaff = () => {
  const form = useForm<TAddStaffFormSchema>({
    resolver: zodResolver(addStaffFormSchema),
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

  // add staff and crate a user account
  const addStaffWithUserAccount = async (
    formData: TAddStaffFormSchema,
    id: string | number,
  ) => {
    const {
      staffId,
      name,
      nid,
      phone,
      dob,
      bloodGroup,
      salary,
      designation,
      address,
      education,
      role,
    } = formData;

    // encrypt password
    const hashResponse = await clientFetch({
      url: apiUrl.hashPassword,
      method: 'POST',
      body: { password: nid },
    });
    const password = hashResponse.password;

    await addStaffWithAccount({
      variables: {
        id: staffId,
        password,
        name,
        nid,
        phone,
        dob,
        bloodGroup,
        salary: Number(salary),
        designation,
        address,
        education: JSON.stringify(education),
        role: role as EUserRole,
      },
    });

    toast.success('Staff Added', { id });
    form.reset();
  };

  const addStaffWithoutUserAccount = async (
    formData: TAddStaffFormSchema,
    id: string | number,
  ) => {
    const {
      staffId,
      name,
      nid,
      phone,
      dob,
      bloodGroup,
      salary,
      designation,
      address,
      education,
    } = formData;
    await addStaffWithoutAccount({
      variables: {
        id: staffId,
        name,
        nid,
        phone,
        dob,
        bloodGroup,
        salary: Number(salary),
        designation,
        address,
        education: JSON.stringify(education),
      },
    });

    toast.success('Staff created successfully', { id });
    form.reset();
  };

  const handleAddStaff = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding staff');

    tryCatch({
      id,
      async tryFn() {
        if (formData.role !== EUserRole.OTHER)
          await addStaffWithUserAccount(formData, id);
        else await addStaffWithoutUserAccount(formData, id);
      },
    });
  });

  return {
    form,
    handleAddStaff,
    isLoading: isAddStaffWithoutAccountLoading || isAddStaffWithAccountLoading,
  };
};
