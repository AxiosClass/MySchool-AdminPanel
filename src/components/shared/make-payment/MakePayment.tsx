import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import { TextInput } from '../form/TextInput';
import { Button } from '@/components/ui/button';
import { useMakePayment } from './useMakePayment';
import { ControlledSelect } from '../form/ControlledSelect';
import { ControlledTextAea } from '../form/ControlledTextArea';
import { PAYMENT_TYPES } from '@/types/common';

const months = [
  { label: 'January', value: '0' },
  { label: 'February', value: '1' },
  { label: 'March', value: '2' },
  { label: 'April', value: '3' },
  { label: 'May', value: '4' },
  { label: 'June', value: '5' },
  { label: 'July', value: '6' },
  { label: 'August', value: '7' },
  { label: 'September', value: '8' },
  { label: 'October', value: '9' },
  { label: 'November', value: '10' },
  { label: 'December', value: '11' },
];

export function MakePayment({ studentId }: { studentId: string }) {
  const {
    form,
    handleAddPayment,
    states: { isOpen, setIsOpen },
    isLoading,
  } = useMakePayment(studentId);

  const type = form.watch('type');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Make Payment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
          <DialogDescription>Provide the following information</DialogDescription>
        </DialogHeader>
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
                options={months}
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
      </DialogContent>
    </Dialog>
  );
}
