import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import { Message } from '../Message';

export type TOption = { label: string; value: string };
type TCommonSelectProps = {
  options: TOption[];
  value: string;
  onValueChange(value: string): void;
  placeholder: string;
  isLoading?: boolean;
};

export const CommonSelect = ({ options, value, onValueChange, placeholder, isLoading }: TCommonSelectProps) => {
  const content = useMemo(() => {
    if (isLoading) return <SelectContentLoader />;
    if (!options.length) return <Message message='No Data Found' className='p-2' />;

    return (
      <>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </>
    );
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{content}</SelectContent>
    </Select>
  );
};

export const SelectContentLoader = () => {
  return (
    <div className='flex flex-col gap-2 p-2'>
      {[...Array(2)].map((_, index) => (
        <Skeleton key={index} className='h-input w-full rounded-md' />
      ))}
    </div>
  );
};
