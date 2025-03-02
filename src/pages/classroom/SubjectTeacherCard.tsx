import { TGetSubjectsWithTeacher } from '@/api/query';
import { UserIcon } from '@/components/shared';
import { TableCell, TableRow } from '@/components/ui/table';
import { AssignSubjectTeacher } from './AssignSubjectTeacher';
import { RemoveSubjectTeacher } from './RemoveSubjectTeacher';

export default function SubjectTeacherCard({ index, data, classroomId }: TSubjectTeacherCardProps) {
  const { classroomSubjectTeacherId, id, name, teacher } = data;

  return (
    <TableRow className='border-b' key={id}>
      <TableCell>
        <div className='flex gap-4'>
          <p className='text-base font-semibold'>
            {index + 1}. {name}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex gap-4'>
          {teacher?.name ? (
            <div className='flex items-center justify-center gap-4'>
              <UserIcon username={teacher?.name} />
              <p className='text-base font-semibold'>{teacher?.name}</p>
              <RemoveSubjectTeacher classroomSubjectTeacherId={classroomSubjectTeacherId} classroomId={classroomId} />
            </div>
          ) : (
            <AssignSubjectTeacher classroomId={classroomId as string} classSubjectId={id} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

// types

type TSubjectTeacherCardProps = {
  index: number;
  classroomId: string;
  data: TGetSubjectsWithTeacher;
};
