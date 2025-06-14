import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { createClass } from '@/api/query';
import { useForm } from 'react-hook-form';
import { CommonFormField } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormDialog } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { errorToast } from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateClass = () => {
  const { open, onOpenChange } = usePopupState();
  const formId = QK.CLASS + '_CREATE';
  const qc = useQueryClient();

  const form = useForm<TCreateClassForm>({
    resolver: zodResolver(createClassFormSchema),
    defaultValues: { name: '', level: '' },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: createClass,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => errorToast(error),
  });

  const handleCreateClass = form.handleSubmit((formData) => {
    const monthlyFee = Number(formData.monthlyFee);
    const admissionFee = Number(formData.admissionFee);
    mutate({ ...formData, monthlyFee, admissionFee });
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Create Class' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Class'
        description='Provide following information to create a class'
        submitButtonTitle='Crate Class'
        submitLoadingTitle='Cratering Class...'
      >
        <Form {...form}>
          <form id={formId} className='space-y-3' onSubmit={handleCreateClass}>
            <CommonFormField control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input class name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='level' label='Level'>
              {({ field }) => <Input {...field} placeholder='Input level' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='monthlyFee' label='Monthly Fee'>
              {({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder='Input monthly fee'
                  type='number'
                  min={0}
                />
              )}
            </CommonFormField>
            <CommonFormField control={form.control} name='admissionFee' label='Admission Fee'>
              {({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder='Input admission fee'
                  type='number'
                  min={0}
                />
              )}
            </CommonFormField>
            <CommonFormField control={form.control} name='termFee' label='Term Fee'>
              {({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder='Input admission fee'
                  type='number'
                  min={0}
                />
              )}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

// schema
const createClassFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  monthlyFee: z.number().positive({ message: 'Monthly fee must be a positive number' }),
  admissionFee: z.number().positive({ message: 'Admission fee must be a positive number' }),
  termFee: z.number().positive({ message: 'Term fee must be a positive number' }),
});

// type
type TCreateClassForm = z.infer<typeof createClassFormSchema>;
