import { QK } from '@/api';
import { getClassroomList } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { TStudentForm } from './student-form';
import { CommonFormField, CommonSelect } from '../form';

export const ClassroomSelection = () => {
  const { watch, control } = useFormContext<TStudentForm>();
  const selectedClass = watch('class');

  const { data: classrooms, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { classId: selectedClass }],
    queryFn: () => getClassroomList(selectedClass),
    select: (res) => res.data.map(({ id, name }) => ({ label: name, value: id })),
    enabled: !!selectedClass,
  });

  return (
    <CommonFormField control={control} name='classroomId' label='Section'>
      {({ field }) => (
        <CommonSelect
          value={field.value}
          onChange={field.onChange}
          placeholder='Select classroom'
          options={classrooms || []}
          isLoading={isLoading}
          disabled={!selectedClass}
        />
      )}
    </CommonFormField>
  );
};
