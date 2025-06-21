import { useMemo } from 'react';
import { Message } from '../Message';
import { Loading } from '@/components/loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CommonSelect = ({
  options,
  value,
  onChange,
  isLoading = false,
  placeholder = 'Select any',
  disabled = false,
  className,
}: TCommonSelectProps) => {
  const content = useMemo(() => {
    if (isLoading)
      return (
        <div className='my-1 flex justify-center'>
          <Loading />
        </div>
      );

    if (!options.length) return <Message className='my-2' message='No options available' />;

    return (
      <>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </>
    );
  }, [options, isLoading]);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={className}>
        {value ? <SelectValue /> : <span className='text-muted-foreground'>{placeholder}</span>}
      </SelectTrigger>
      <SelectContent>{content}</SelectContent>
    </Select>
  );
};

// types
type TCommonSelectProps = {
  options: TOption[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

type TOption = { label: string; value: string };
