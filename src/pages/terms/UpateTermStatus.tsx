import { QK } from '@/api';
import { updateTermStatus } from '@/api/query';
import { Loader } from '@/components/loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast } from '@/helpers';
import { TERM_STATUS, TTerm } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';

type TUpdateStatusProps = Pick<TTerm, 'id' | 'status'>;

export const UpdateTermStatus = ({ id, status }: TUpdateStatusProps) => {
  const qc = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<string>(status);
  const { mutate, isPending } = useMutation({ mutationFn: updateTermStatus });

  const handleStatusChange = (value: string) => {
    if (value === status) return;
    const currentStatusIndex = termStatusOptions.findIndex((t) => t.value === status);
    const targetStatusIndex = termStatusOptions.findIndex((t) => t.value === value);

    if (currentStatusIndex > targetStatusIndex) return toast.error(`Can not update stats form ${status} to ${value}`);

    mutate(
      { id, status: value as TERM_STATUS },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.TERM] });
          setSelectedStatus(value);
        },
        onError: (error) => errorToast(error),
      },
    );
  };

  if (isPending) return <UpdatingStatus />;

  return (
    <Select value={selectedStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className='w-full max-w-52'>
        <SelectValue placeholder='Select Status' />
      </SelectTrigger>
      <SelectContent>
        {termStatusOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const UpdatingStatus = () => (
  <div className='flex w-fit items-center gap-2 text-nowrap'>
    <Loader />
    <span className='font-semibold'>Updating Satus</span>
  </div>
);

const termStatusOptions = [
  { label: 'Pending', value: TERM_STATUS.PENDING },
  { label: 'Ongoing', value: TERM_STATUS.ONGOING },
  { label: 'Ended', value: TERM_STATUS.ENDED },
];
