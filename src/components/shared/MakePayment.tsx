import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { months } from '@/data';
import { useForm } from 'react-hook-form';
import { ActionButton } from '../ui/button';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonFormField, CommonSelect, FormDialog } from './form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen, zodNumber } from '@/helpers';
import { Form } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { PAYMENT_TYPE } from '@/types';
import { makePayment } from '@/api/query';

export const MakePayment = ({ studentId }: { studentId: string }) => {
  const form = useForm<TMakePaymentFromSchema>({
    resolver: zodResolver(makePaymentFormSchema),
    defaultValues: { amount: '', description: '', month: '', type: '', year: '' },
  });

  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const formId = QK.PAYMENT + '_MAKE' + studentId;
  const paymentType = form.watch('type');

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: makePayment,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.PAYMENT] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleMakePayment = form.handleSubmit((formData) => {
    const amount = Number(formData.amount);
    const month = Number(formData.month) ?? null;
    const year = Number(formData.year);
    const description = formData.description ?? null;
    const type = formData.type as PAYMENT_TYPE;

    mutate({ studentId, amount, month, year, description, type });
  });

  return (
    <>
      <ActionButton
        actionType='UPDATE'
        label='Make Payment'
        onClick={() => onOpenChange(true)}
        className='bg-primary text-white'
      />
      <FormDialog open={open} onOpenChange={onOpenChange} title='Make Payment' formId={formId}>
        <Form {...form}>
          <form id={formId} onSubmit={handleMakePayment} className='flex flex-col gap-3'>
            <CommonFormField control={form.control} name='amount' label='Amount'>
              {({ field }) => <Input {...field} placeholder='Input amount' type='number' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='description' label='Description'>
              {({ field }) => <Textarea {...field} placeholder='Write down description' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='type' label='Payment Type'>
              {({ field }) => (
                <CommonSelect options={paymentTypeOptions} {...field} placeholder='Select payment type' />
              )}
            </CommonFormField>

            {paymentType === PAYMENT_TYPE.MONTHLY_FEE && (
              <CommonFormField control={form.control} name='month' label='Month'>
                {({ field }) => (
                  <CommonSelect
                    options={monthOptions}
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder='Select month'
                  />
                )}
              </CommonFormField>
            )}
            <CommonFormField control={form.control} name='year' label='Year'>
              {({ field }) => <CommonSelect options={yearOptions} {...field} placeholder='Select year' />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const paymentTypeOptions = Object.keys(PAYMENT_TYPE).map((key) => ({ label: key, value: key }));
const monthOptions = months.map((month, index) => ({ label: month, value: String(index) }));
const yearOptions = ['2024', '2025'].map((year) => ({ label: year, value: year }));

// schema
const makePaymentFormSchema = z.object({
  amount: zodNumber({ min: 0, message: 'Invalid amount' }),
  month: z.string().optional(),
  year: z.string().min(0, { message: 'Invalid Year' }),
  description: z.string().optional(),
  type: z.string().min(1, { message: 'Payment type is required' }),
});

// type
type TMakePaymentFromSchema = z.infer<typeof makePaymentFormSchema>;
