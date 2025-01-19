import { Form } from '@/components/ui/form';
import { TextInput } from '../form/TextInput';
import { Button } from '@/components/ui/button';
import { ControlledTextAea } from '../form/ControlledTextArea';
import { ControlledSelect } from '../form/ControlledSelect';
import { useMakePayment } from './useMakePayment';
import { PAYMENT_TYPES } from '@/types/commonType';
import { CustomDialog } from '../CustomDialog';
import { useMemo } from 'react';
import { months } from '@/data/constants';

export function MakePayment({ studentId }: { studentId: string }) {
  const {
    form,
    handleAddPayment,
    states: { isOpen, setIsOpen },
    isLoading,
  } = useMakePayment(studentId);

  const type = form.watch('type');

  const monthsOption = useMemo(() => {
    return months.map((month, index) => ({ label: month, value: String(index) }));
  }, []);

  return (
    <CustomDialog
      title='Make Payment'
      description='Provide the following information'
      trigger={<Button>Make Payment</Button>}
      control={{ isDialogOpen: isOpen, setIsDialogOpen: setIsOpen }}
      asChild
    >
      <Form {...form}>
        <form className='flex flex-col gap-3' onSubmit={handleAddPayment}>
          <TextInput control={form.control} label='Amount' name='amount' placeholder='Input amount' />
          <ControlledTextAea
            control={form.control}
            label='Description'
            name='description'
            placeholder='Input description'
          />

          <ControlledSelect
            control={form.control}
            label='Select payment type'
            name='type'
            placeholder='Select payment type'
            options={[
              { label: 'ADMISSION_FEE', value: 'ADMISSION_FEE' },
              { label: 'MONTHLY_FEE', value: 'MONTHLY_FEE' },
              { label: 'OTHERS', value: 'OTHERS' },
            ]}
          />

          {type === PAYMENT_TYPES.MONTHLY_FEE && (
            <ControlledSelect
              control={form.control}
              label='Month'
              name='month'
              placeholder='Select Month'
              options={monthsOption}
            />
          )}

          <ControlledSelect
            control={form.control}
            label='Year'
            name='year'
            placeholder='Select Year'
            options={[
              { label: '2024', value: '2024' },
              { label: '2025', value: '2025' },
            ]}
          />

          <Button className='mt-4' disabled={isLoading}>
            {isLoading ? 'Proceeding' : 'Proceed'}
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
}
