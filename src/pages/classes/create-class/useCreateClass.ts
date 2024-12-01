import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClassMutation } from '@/data-fetching/hooks/class';

const createClassFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  monthlyFee: z.string().min(1, { message: 'Monthly fee is required' }),
  admissionFee: z.string().min(1, { message: 'Admission fee is required' }),
});

type TCreateClassFormSchema = z.infer<typeof createClassFormSchema>;

export const useCreateClass = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createClassMutation, isLoading } = useCreateClassMutation();

  const form = useForm<TCreateClassFormSchema>({
    resolver: zodResolver(createClassFormSchema),
    defaultValues: { name: '', level: '', admissionFee: '', monthlyFee: '' },
  });

  const handleCreateClass = form.handleSubmit(async (formData) => {
    const id = toast.loading('Class creating ...!');
    const { name, level, admissionFee, monthlyFee } = formData;

    tryCatch({
      id,
      tryFn: async () => {
        if (Number(admissionFee) < 0) {
          form.setError('admissionFee', { message: 'Admission fee can not be negative' });
          throw new Error('Admission fee can not be negative');
        }
        if (Number(monthlyFee) < 0) {
          form.setError('monthlyFee', { message: 'Monthly fee can not be negative' });
          throw new Error('Monthly fee can not be negative');
        }

        const response = await createClassMutation.mutateAsync({
          name,
          level,
          admissionFee: Number(admissionFee),
          monthlyFee: Number(monthlyFee),
        });
        toast.success(response.message, { id });
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen, isLoading },
    handlers: { handleCreateClass },
  };
};
