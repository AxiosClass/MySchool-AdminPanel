import { TableBodyLoader } from '@/components/loader';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonTable, TableNoData } from '@/components/shared';
import { AssignSubjectTeacher } from './AssignSubjectTeacher';
import { RemoveSubjectTeacher } from './RemoveSubjectTeacher';
import { useGetSubjectListFormClassroom } from '@/hooks';

export const SubjectTable = ({ sectionId }: { sectionId: string }) => (
  <CommonTable head={<SubjectTableHead />} tableContainerClassName='px-6'>
    <SubjectTableBody sectionId={sectionId} />
  </CommonTable>
);

const SubjectTableHead = () => (
  <>
    <TableHead>Name</TableHead>
    <TableHead>Type</TableHead>
    <TableHead>Teacher Info</TableHead>
    <TableHead>Action</TableHead>
  </>
);

const SubjectTableBody = ({ sectionId }: { sectionId: string }) => {
  const { data: subjectList, isLoading } = useGetSubjectListFormClassroom(sectionId);

  if (isLoading) return <TableBodyLoader cols={4} />;
  if (!subjectList?.length) return <TableNoData colSpan={4} message='No Subject Found' />;

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
