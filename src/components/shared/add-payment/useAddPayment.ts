import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { numberGenerator } from '@/helpers/zodHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const addPaymentSchema = z.object({
  amount: numberGenerator({ min: 100, minErrorMessage: 'Minimum amount is 100' }),
  month: numberGenerator({ min: 0, max: 11, minErrorMessage: 'Invalid month', maxErrorMessage: 'Invalid month' }),
  year: numberGenerator({ min: 2024, minErrorMessage: 'Invalid year' }),
  description: z.string().optional(),
  type: z.string().min(1, { message: 'Payment type is required' }),
});

type TAddPaymentFromSchema = z.infer<typeof addPaymentSchema>;

const date = new Date();

export const useAddPayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TAddPaymentFromSchema>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: { amount: 0, description: '', month: 0, type: '', year: date.getFullYear() },
  });

  const handleAddPayment = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return { form, handleAddPayment, states: { isOpen, setIsOpen } };
};
