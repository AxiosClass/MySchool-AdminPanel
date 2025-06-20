import { QK } from '@/api';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { usePopupState } from '@/hooks';
import { USER_ROLE } from '@/lib/types';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdmin } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

const formId = QK.ADMINS + '_CREATE_';

export const CreateAdmin = () => {
  const form = useForm<TCreateAdminForm>({
    resolver: zodResolver(createAdminFormSchema),
    defaultValues: { name: '', email: '', role: USER_ROLE.ADMIN },
  });

  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: createAdmin,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.ADMINS] });
      toast.success(res.message);
      onOpenChange(false);
      form.reset();
    },
    onError: errorToast,
  });

  const handleCreateAdmin = form.handleSubmit((formData) => {
    mutate(formData);
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Create Admin' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create new admin'
        description='Please fill up the form to create a new admin'
        submitButtonTitle='Create'
        submitLoadingTitle='Creating...'
      >
        <Form {...form}>
          <form className='flex flex-col gap-4' id={formId} onSubmit={handleCreateAdmin}>
            <CommonFormField control={form.control} name='name' label='Full Name'>
              {({ field }) => <Input {...field} placeholder='Input Admin Name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='email' label='Email'>
              {({ field }) => <Input {...field} placeholder='Input Email' />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

// Schemas
const createAdminFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.nativeEnum(USER_ROLE),
});

// types
type TCreateAdminForm = z.infer<typeof createAdminFormSchema>;
