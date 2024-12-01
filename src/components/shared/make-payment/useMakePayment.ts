import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMakePaymentMutation } from '@/data-fetching/hooks/payment';

const makePaymentSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
  month: z.string().min(0, { message: 'Invalid Month' }),
  year: z.string().min(0, { message: 'Invalid Year' }),
  description: z.string().optional(),
  type: z.string().min(1, { message: 'Payment type is required' }),
});

type TMakePaymentFromSchema = z.infer<typeof makePaymentSchema>;

export const useMakePayment = (studentId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TMakePaymentFromSchema>({
    resolver: zodResolver(makePaymentSchema),
    defaultValues: { amount: '', description: '', month: '', type: '', year: '' },
  });

  const { makePaymentMutation, isLoading } = useMakePaymentMutation(studentId);

  const handleAddPayment = form.handleSubmit(async (formData) => {
    const id = toast.loading('Making Payment');
    tryCatch({
      id,
      tryFn: async () => {
        const response = await makePaymentMutation.mutateAsync({
          ...formData,
          amount: Number(formData.amount),
          month: Number(formData.month),
          year: Number(formData.year),
          studentId,
        });

        toast.success(response?.message, { id });
        form.reset();
        setIsOpen(false);
      },
    });
  });

  return { form, handleAddPayment, states: { isOpen, setIsOpen }, isLoading };
};
