import { QK } from '@/api';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MdDiscount } from 'react-icons/md';
import { CommonFormField, FormDialog } from '../form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { giveDiscount } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

export const GiveDiscount = ({ studentId }: { studentId: string }) => {
  const formId = `${QK.DISCOUNT}_ADD`;
  const qc = useQueryClient();

  const { open, onOpenChange } = usePopupState();
  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: giveDiscount });

  const handleGrantDiscount = (formData: TDiscountForm, reset: () => void) => {
    mutate(
      { ...formData, studentId },
      {
        onSuccess: (res) => {
          qc.invalidateQueries({ queryKey: [QK.PAYMENT] });
          qc.invalidateQueries({ queryKey: [QK.STUDENT] });
          toast.success(res.message);
          reset();
          onOpenChange(false);
        },
        onError: errorToast,
      },
    );
  };

  return (
    <>
      <Button variant='outline' onClick={() => onOpenChange(true)} className='w-44 bg-white'>
        <MdDiscount className='size-4' /> Grant Discount
      </Button>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        formId={formId}
        title='Grant Discount'
        description='Fill up the following form'
        submitButtonTitle='Grant'
        submitLoadingTitle='Granting...'
      >
        <DiscountForm formId={formId} onSubmit={handleGrantDiscount} />
      </FormDialog>
    </>
  );
};

type TDiscountFormPops = { formId: string; onSubmit: (value: TDiscountForm, reset: () => void) => void };
const DiscountForm = ({ formId, onSubmit }: TDiscountFormPops) => {
  const form = useForm<TDiscountForm>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: { description: '' },
  });

  const handleSubmit = form.handleSubmit((formData: TDiscountForm) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form id={formId} onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <CommonFormField control={form.control} name='amount' label='Amount'>
          {({ field }) => <Input {...field} value={field.value || ''} type='number' placeholder='Input Amount' />}
        </CommonFormField>
        <CommonFormField control={form.control} name='description' label='Description'>
          {({ field }) => <Textarea {...field} placeholder='Write down description' />}
        </CommonFormField>
      </form>
    </Form>
  );
};

const discountFormSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount can not be negative' }),
  description: z.string().max(255, 'Description must be 255 characters or fewer').optional(),
});

type TDiscountForm = z.infer<typeof discountFormSchema>;
