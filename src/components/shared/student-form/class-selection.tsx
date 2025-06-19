import { QK } from '@/api';
import { getClassList } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { CommonFormField, CommonSelect } from '../form';
import { useFormContext } from 'react-hook-form';
import { TStudentForm } from './student-form';

export const ClassSelection = () => {
  const { control, setValue } = useFormContext<TStudentForm>();

  const { data: classes, isLoading } = useQuery({
    queryKey: [QK.CLASS, 'LIST'],
    queryFn: getClassList,
    select: (res) => res.data.map(({ level, name }) => ({ label: name, value: level })),
  });

  return (
    <CommonFormField control={control} name='class' label='Class'>
      {({ field }) => (
        <CommonSelect
          value={field.value}
          onChange={(val) => {
            setValue('classroomId', '');
            field.onChange(val);
          }}
          placeholder='Select class'
          options={classes || []}
          isLoading={isLoading}
          disabled={isLoading}
        />
      )}
    </CommonFormField>
  );
};
