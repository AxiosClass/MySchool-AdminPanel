import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { changePassword } from '@/api/query';
import { errorToast } from '@/helpers';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { TooltipContainer } from './TooltipContainer';
import { KeySquareIcon } from 'lucide-react';
import { CommonFormField, FormDialog } from './form';
import { PasswordInput } from '../ui/input';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

const formId = QK.AUTH;
export const ChangePassword = () => {
  const { open, onOpenChange } = usePopupState();

  const form = useForm<TChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: changePassword,
    onSuccess: (res) => {
      toast.success(res.message);
      onOpenChange(false);
      form.reset();
    },
    onError: errorToast,
  });

  const handleChangePassword = form.handleSubmit((formData) => {
    const { currentPassword, newPassword } = formData;
    mutate({ currentPassword, newPassword });
  });

  return (
    <>
      <TooltipContainer label='Change password'>
        <Button variant='outline' size='icon' onClick={() => onOpenChange(true)}>
          <KeySquareIcon className='size-4' />
        </Button>
      </TooltipContainer>

      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Change Password'
        submitButtonTitle='Proceed'
        submitLoadingTitle='Pending...'
      >
        <Form {...form}>
          <form id={formId} className='space-y-3' onSubmit={handleChangePassword}>
            <CommonFormField control={form.control} name='currentPassword' label='Current Password'>
              {({ field }) => <PasswordInput {...field} placeholder='Input  old password' />}
            </CommonFormField>

            <CommonFormField control={form.control} name='newPassword' label='New Password'>
              {({ field }) => <PasswordInput {...field} placeholder='Input new password' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='confirmPassword' label='Confirm Password'>
              {({ field }) => <PasswordInput {...field} placeholder='Input new password again' />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmPassword)
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password does not match with new password',
        path: ['confirmPassword'],
      });
  });

type TChangePasswordForm = z.infer<typeof changePasswordSchema>;
