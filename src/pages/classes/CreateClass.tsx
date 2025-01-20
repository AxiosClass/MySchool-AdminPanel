import { QK } from '@/api';
import { createClass } from '@/api/query';
import { ActionButton } from '@/components/ui/button';
import { FormDialog } from '@/components/ui/dialog';
import { CommonFormFiled, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { errorMessageGen, zodNumber } from '@/helpers';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createClassFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  monthlyFee: zodNumber({ min: 100, message: 'Minimum monthly fee is 100 taka' }),
  admissionFee: zodNumber({ min: 500, message: 'Minimum monthly fee is 500 taka' }),
});

type TCreateClassForm = z.infer<typeof createClassFormSchema>;

const mutationKey = QK.CLASS + '_CREATE';

export const CreateClass = () => {
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const form = useForm<TCreateClassForm>({
    resolver: zodResolver(createClassFormSchema),
    defaultValues: { name: '', level: '', monthlyFee: '', admissionFee: '' },
  });

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: createClass,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  console.log(form.formState.errors);

  const handleCreateClass = form.handleSubmit((formData) => {
    console.log('Submitted');
    console.log(formData);
    const monthlyFee = Number(formData.monthlyFee);
    const admissionFee = Number(formData.admissionFee);
    mutate({ ...formData, monthlyFee, admissionFee });
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Create Class' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={mutationKey}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Class'
        description='Provide following information to create a class'
        submitButtonTitle='Crate Class'
        submitLoadingTitle='Cratering Class...'
      >
        <Form {...form}>
          <form id={mutationKey} className='space-y-3' onSubmit={handleCreateClass}>
            <CommonFormFiled control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input class name' />}
            </CommonFormFiled>
            <CommonFormFiled control={form.control} name='level' label='Level'>
              {({ field }) => <Input {...field} placeholder='Input level' />}
            </CommonFormFiled>
            <CommonFormFiled control={form.control} name='monthlyFee' label='Monthly Fee'>
              {({ field }) => <Input {...field} placeholder='Input monthly fee' type='number' min={0} />}
            </CommonFormFiled>
            <CommonFormFiled control={form.control} name='admissionFee' label='Admission Fee'>
              {({ field }) => <Input {...field} placeholder='Input admission fee' type='number' min={0} />}
            </CommonFormFiled>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};
