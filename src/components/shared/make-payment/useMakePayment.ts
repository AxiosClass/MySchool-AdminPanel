import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { numberGenerator } from '@/helpers/zodHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const makePaymentSchema = z.object({
  amount: numberGenerator({ min: 100, minErrorMessage: 'Minimum amount is 100' }),
  month: numberGenerator({ min: 0, max: 11, minErrorMessage: 'Invalid month', maxErrorMessage: 'Invalid month' }),
  year: numberGenerator({ min: 2024, minErrorMessage: 'Invalid year' }),
  description: z.string().optional(),
  type: z.string().min(1, { message: 'Payment type is required' }),
});

type TMakePaymentFromSchema = z.infer<typeof makePaymentSchema>;

const date = new Date();

export const useMakePayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TMakePaymentFromSchema>({
    resolver: zodResolver(makePaymentSchema),
    defaultValues: { amount: 0, description: '', month: 0, type: '', year: date.getFullYear() },
  });

  const handleAddPayment = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return { form, handleAddPayment, states: { isOpen, setIsOpen } };
};
