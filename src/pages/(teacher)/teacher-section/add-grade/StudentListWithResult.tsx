import { getStudentWithTermResult, TGetStudentWithTermResultResponse } from '@/api/query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCapIcon, NotebookPenIcon, Edit3Icon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Message } from '@/components/shared';
import { usePopupState } from '@/hooks';
import { QK } from '@/api';
import { Button } from '@/components/ui/button';

// Main Types
type TStudentWithResult = TGetStudentWithTermResultResponse[number];

type TStudentListWithResultProps = { sectionId: string; subjectId: string; termId: string };
export const StudentListWithResult = ({ sectionId, subjectId, termId }: TStudentListWithResultProps) => {
  const { data: students, isPending } = useQuery({
    queryKey: [QK.TERM_RESULT, { sectionId, subjectId, termId }],
    queryFn: () => getStudentWithTermResult({ classroomId: sectionId, subjectId, termId }),
    select: (res) => res.data,
  });

  if (isPending) return null;
  if (!students?.length) return <Message className='my-12' message='No Student Found!' />;

  return (
    <div className='flex flex-col gap-4 p-4'>
      {students.map((student) => (
        <StudentWithResult key={student.studentId} {...student} />
      ))}
    </div>
  );
};

type TStudentWithResultProps = TStudentWithResult;
const StudentWithResult = ({ studentName, studentId, marks }: TStudentWithResultProps) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <Card className='border-primary-100 bg-background shadow-none'>
      <StudentInfoHeader studentId={studentId} studentName={studentName} />
      <CardContent>
        {open && <></>}
        {!open && <>{!marks && <NoGrade onOpenChange={onOpenChange} />}</>}
      </CardContent>
    </Card>
  );
};

type TStudentInfoHeaderProps = Pick<TStudentWithResult, 'studentId' | 'studentName'>;
const StudentInfoHeader = ({ studentId, studentName }: TStudentInfoHeaderProps) => {
  return (
    <CardHeader>
      <div className='flex items-center gap-4'>
        <div className='rounded-md bg-primary-100/50 p-2'>
          <GraduationCapIcon className='size-6 text-primary-500' />
        </div>
        <div className='space-y-1'>
          <CardTitle>{studentName}</CardTitle>
          <p className='text-muted-foreground'>#{studentId}</p>
        </div>
      </div>
    </CardHeader>
  );
};

type TNoGradeProps = { onOpenChange: (value: boolean) => void };
const NoGrade = ({ onOpenChange }: TNoGradeProps) => (
  <div className='mt-4 space-y-4'>
    <div className='flex items-center justify-center gap-2'>
      <NotebookPenIcon className='size-4' />
      <p className='text-muted-foreground'>Student hasn't been graded yet. Click the button below to start grading.</p>
    </div>
    <Button variant='outline' size='sm' onClick={() => onOpenChange(true)} className='mx-auto flex w-fit'>
      <Edit3Icon className='size-4' /> Start Grading
    </Button>
  </div>
);
