import { QK } from '@/api';
import { TableLoader } from '@/components/loader';
import { getSubjectListForClassroom, TGetSubjectsForClassroom } from '@/api/query';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonTable, TableNoData } from '@/components/shared';
import { AssignSubjectTeacher } from './AssignSubjectTeacher';
import { useQuery } from '@tanstack/react-query';
import { RemoveSubjectTeacher } from './RemoveSubjectTeacher';

type SubjectTableProps = { sectionId: string };

export const SubjectTable = ({ sectionId }: SubjectTableProps) => {
  const { data: subjectList, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, QK.SUBJECT, { sectionId }],
    queryFn: () => getSubjectListForClassroom(sectionId),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Teacher Info</TableHead>
          <TableHead>Action</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      <SubjectTableBody subjectList={subjectList ?? []} sectionId={sectionId} />
    </CommonTable>
  );
};

type TSubjectTableBodyProps = { subjectList: TGetSubjectsForClassroom[]; sectionId: string };

const SubjectTableBody = ({ subjectList, sectionId }: TSubjectTableBodyProps) => {
  if (!subjectList.length) return <TableNoData colSpan={4} message='No Subject Found' />;

  return subjectList.map(({ id, subjectId, subjectName, subjectType, teacher }) => (
    <TableRow key={subjectId}>
      <TableCell>{subjectName}</TableCell>
      <TableCell>{subjectType}</TableCell>
      <TableCell>
        {teacher ? (
          <div>
            <h2 className='font-semibold'>{teacher.name}</h2>
            <p className='text-sm text-muted-foreground'>{teacher.phone}</p>
          </div>
        ) : (
          <p className='text-muted-foreground'>No Teacher Assigned</p>
        )}
      </TableCell>
      <TableCell>
        {!id && <AssignSubjectTeacher sectionId={sectionId} subjectId={subjectId} />}
        {id && <RemoveSubjectTeacher classroomSubjectTeacherId={id} sectionId={sectionId} />}
      </TableCell>
    </TableRow>
  ));
};
