import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Message } from '../Message';
import { useMemo } from 'react';
import { Loading } from '@/components/ui/loader';

export const CommonSelect = ({
  options,
  value,
  onChange,
  isLoading = false,
  placeholder = 'Select any',
}: TCommonSelectProps) => {
  const content = useMemo(() => {
    if (isLoading) return <Loading />;
    if (!options.length) return <Message message='No options available' />;

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
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
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
};

type TOption = { label: string; value: string };
