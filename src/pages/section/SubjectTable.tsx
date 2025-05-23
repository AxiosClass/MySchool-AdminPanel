import { QK } from '@/api';
import { getSubjectListForClassroom, TGetSubjectsForClassroom } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { CommonTable, TableNoData } from '@/components/shared';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { AssignSubjectTeacher } from './AssignSubjectTeacher';

export const SubjectTable = ({ sectionId }: { sectionId: string }) => {
  const { data: subjectList, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { sectionId }],
    queryFn: () => getSubjectListForClassroom(sectionId),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Name</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Action</TableHead>
        </>
      }
    >
      <SubjectTableBody subjectList={subjectList ?? []} sectionId={sectionId} />
    </CommonTable>
  );
};

type TSubjectTableBodyProps = { subjectList: TGetSubjectsForClassroom[]; sectionId: string };

const SubjectTableBody = ({ subjectList, sectionId }: TSubjectTableBodyProps) => {
  if (!subjectList.length) return <TableNoData colSpan={4} message='No Subject Found' />;

  return subjectList.map(({ subjectId, subjectName, teacher }) => (
    <TableRow key={subjectId}>
      <TableCell>{subjectName}</TableCell>
      <TableCell>
        {teacher ? (
          <h2 className='font-semibold'>{teacher.name}</h2>
        ) : (
          <p className='text-muted-foreground'>No Teacher Assigned</p>
        )}
      </TableCell>
      <TableCell>{teacher?.phone || <span className='font-semibold'>N/A</span>}</TableCell>
      <TableCell>{teacher ? <></> : <AssignSubjectTeacher sectionId={sectionId} subjectId={subjectId} />}</TableCell>
    </TableRow>
  ));
};
