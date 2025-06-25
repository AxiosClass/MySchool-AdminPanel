import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { months } from '@/data';
import { useForm, useFormContext } from 'react-hook-form';
import { Button } from '../../ui/button';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonFormField, CommonSelect, FormDialog } from '../form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, getYearsFromDateToNow } from '@/helpers';
import { Form } from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { PAYMENT_TYPE } from '@/lib/types';
import { getStudentClassInfo, makePayment } from '@/api/query';
import { BsFillWalletFill } from 'react-icons/bs';
import { Skeleton } from '../../ui/skeleton';
import { useMemo } from 'react';
import { TooltipContainer } from '../TooltipContainer';

type TButtonType = 'button' | 'icon';
export const MakePayment = ({ studentId, type = 'button' }: { studentId: string; type?: TButtonType }) => {
  const form = useForm<TMakePaymentFrom>({
    resolver: zodResolver(makePaymentFormSchema),
    defaultValues: { description: '', type: '', year: new Date().getFullYear() },
  });

  const qc = useQueryClient();
  const formId = QK.PAYMENT + '_MAKE' + studentId;
  const { open, onOpenChange } = usePopupState();

  const { data, isLoading } = useQuery({
    queryKey: [QK.CLASS, { studentId }],
    queryFn: () => getStudentClassInfo(studentId),
    select: (res) => res.data,
  });

  const classInfo = useMemo(() => {
    return {
      ADMISSION_FEE: data?.admissionFee ?? 0,
      MONTHLY_FEE: data?.monthlyFee ?? 0,
      TERM_FEE: data?.monthlyFee ?? 0,
    };
  }, [data]);

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: makePayment,
    onSuccess: (res) => {
      toast.success(res.message);

      qc.invalidateQueries({ queryKey: [QK.PAYMENT] });
      qc.invalidateQueries({ queryKey: [QK.DUE] });
      qc.invalidateQueries({ queryKey: [QK.STUDENT] });
      qc.invalidateQueries({ queryKey: [QK.OVERVIEW] });

      form.reset();
      onOpenChange(false);
    },
    onError: errorToast,
  });

  const handleMakePayment = form.handleSubmit((formData) => {
    const { amount, year } = formData;
    const month = formData.month ?? null;
    const description = formData.description ?? null;
    const type = formData.type as PAYMENT_TYPE;

    mutate({ studentId, amount, month, year, description, type, classId: data?.id as string });
  });

  return (
    <>
      <MakePaymentTrigger type={type} onClick={() => onOpenChange(true)} />

      <FormDialog open={open} onOpenChange={onOpenChange} title='Make Payment' formId={formId}>
        <Form {...form}>
          <MakePaymentForm
            formId={formId}
            onSubmit={handleMakePayment}
            classInfo={classInfo || {}}
            isLoading={isLoading}
          />
        </Form>
      </FormDialog>
    </>
  );
};

const MakePaymentTrigger = ({ type, onClick }: { type: TButtonType; onClick: () => void }) => {
  switch (type) {
    case 'button':
      return (
        <Button variant='outline' onClick={onClick} className='w-44'>
          <BsFillWalletFill className='size-4' /> Take Payment
        </Button>
      );

    case 'icon':
      return (
        <TooltipContainer label='Take Payment'>
          <Button variant='outline' onClick={onClick} size='sm'>
            <BsFillWalletFill className='size-4' />
          </Button>
        </TooltipContainer>
      );
  }
};

type TMakePaymentFromProps = {
  formId: string;
  onSubmit: () => void;
  classInfo: Record<string, number>;
  isLoading: boolean;
};

const MakePaymentForm = ({ formId, onSubmit, classInfo, isLoading }: TMakePaymentFromProps) => {
  const { control, watch, setValue } = useFormContext<TMakePaymentFrom>();
  const paymentType = watch('type');

  if (isLoading) return <MakePaymentSkeleton />;

  return (
    <form id={formId} onSubmit={onSubmit} className='flex flex-col gap-3'>
      <CommonFormField control={control} name='type' label='Payment Type'>
        {({ field }) => (
          <CommonSelect
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              setValue('amount', classInfo[value] ?? 0);
            }}
            options={paymentTypeOptions}
            placeholder='Select payment type'
          />
        )}
      </CommonFormField>

      <CommonFormField control={control} name='amount' label='Amount'>
        {({ field }) => <Input {...field} placeholder='Input amount' type='number' />}
      </CommonFormField>

      <CommonFormField control={control} name='year' label='Year'>
        {({ field }) => (
          <CommonSelect
            options={yearOptions}
            value={field.value.toString()}
            onChange={(val) => Number(field.onChange(val))}
            placeholder='Select year'
          />
        )}
      </CommonFormField>

      {paymentType === PAYMENT_TYPE.MONTHLY_FEE && (
        <CommonFormField control={control} name='month' label='Month'>
          {({ field }) => (
            <CommonSelect
              options={monthOptions}
              value={field.value?.toString() || ''}
              onChange={(val) => Number(field.onChange(val))}
              placeholder='Select month'
            />
          )}
        </CommonFormField>
      )}

      <CommonFormField control={control} name='description' label='Description'>
        {({ field }) => <Textarea {...field} placeholder='Write down description' />}
      </CommonFormField>
    </form>
  );
};

const MakePaymentSkeleton = () => (
  <div className='flex flex-col gap-4'>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className='space-y-2'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-4 w-full' />
      </div>
    ))}
  </div>
);

const paymentTypeOptions = Object.keys(PAYMENT_TYPE).map((key) => ({ label: key, value: key }));
const monthOptions = months.map((month, index) => ({ label: month, value: String(index) }));
const yearOptions = getYearsFromDateToNow('2025-01-01').map((year) => ({ label: year, value: year }));

// schema
const makePaymentFormSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive({ message: 'Amount must be greater than 0' }),

  month: z.coerce
    .number({ invalid_type_error: 'Month must be a number' })
    .min(0, { message: 'Month must be between 1 and 12' })
    .max(11, { message: 'Month must be between 1 and 12' })
    .optional(),

  year: z.coerce
    .number({ invalid_type_error: 'Year must be a number' })
    .min(2025, { message: 'Year must be 2025 or later' }),

  description: z
    .string()
    .optional()
    .transform((val) => val?.trim()),

  type: z.string().min(1, { message: 'Payment type is required' }),
});

// type
type TMakePaymentFrom = z.infer<typeof makePaymentFormSchema>;
