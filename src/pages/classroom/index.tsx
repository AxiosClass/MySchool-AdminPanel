import { QK } from '@/api';
import { useParams } from 'react-router-dom';
import { TableLoader } from '@/components/loader';
import { CommonTable, Message, PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableHead } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { getSubjectsWithTeacher } from '@/api/query';
import SubjectTeacherCard from './SubjectTeacherCard';

export default function ClassroomPage() {
  return (
    <>
      <PageTitle title='Classroom' />
      <ScrollArea>
        <PageHeader label='Classroom' />
        <section className='mb-6 mt-6 grid grid-cols-2 gap-4 px-6'>{/* <SubjectsTable /> */}</section>
      </ScrollArea>
    </>
  );
}

const SubjectsTable = () => {
  const { classroomId } = useParams();

  const { data: subjectsData, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { classroomId }],
    queryFn: () => getSubjectsWithTeacher(classroomId as string),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;
  if (!subjectsData?.length) return <Message message='No Subjects has been Found' className='my-6' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Subject</TableHead>
          <TableHead>Teacher</TableHead>
        </>
      }
      className={{ tableContainer: 'w-fit' }}
    >
      {subjectsData?.map((subject, index) => (
        <SubjectTeacherCard key={subject.id} index={index} data={subject} classroomId={classroomId as string} />
      ))}
    </CommonTable>
  );
};
