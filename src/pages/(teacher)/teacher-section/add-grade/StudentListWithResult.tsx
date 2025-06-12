import { addTermResult, getStudentWithTermResult, TGetStudentWithTermResultResponse } from '@/api/query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCapIcon, NotebookPenIcon, Edit3Icon, SaveIcon, BanIcon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/components/shared';
import { usePopupState } from '@/hooks';
import { Button } from '@/components/ui/button';
import { GradeForm, TGradeForm } from './GradeForm';
import { Separator } from '@/components/ui/separator';
import { QK } from '@/api';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

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
        <StudentWithResult key={student.studentId} termId={termId} sectionId={sectionId} {...student} />
      ))}
    </div>
  );
};

type TStudentWithResultProps = TStudentWithResult & { termId: string; sectionId: string };
const StudentWithResult = ({
  studentName,
  studentId,
  subjectType,
  subjectId,
  marks,
  termId,
  sectionId,
}: TStudentWithResultProps) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <Card className='bg-background'>
      <StudentInfoHeader studentId={studentId} studentName={studentName} />
      <CardContent>
        {open && (
          <StudentGradeFormWrapper
            studentId={studentId}
            subjectId={subjectId}
            subjectType={subjectType}
            termId={termId}
            sectionId={sectionId}
            onOpenChange={onOpenChange}
          />
        )}

        {!open && (
          <>
            {!marks && <NoGrade onOpenChange={onOpenChange} />}
            {marks && <></>}
          </>
        )}
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

type TStudentGradeFormWrapperProps = Pick<TStudentWithResult, 'studentId' | 'subjectId' | 'subjectType' | 'marks'> & {
  termId: string;
  sectionId: string;
  onOpenChange: (value: boolean) => void;
};

const StudentGradeFormWrapper = ({
  studentId,
  subjectId,
  subjectType,
  marks,
  termId,
  sectionId,
  onOpenChange,
}: TStudentGradeFormWrapperProps) => {
  const formId = `${QK.TERM_RESULT}_${studentId}`;
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({ mutationKey: [formId], mutationFn: addTermResult });

  const handleGrading = (formDatadata: TGradeForm, reset: () => void) => {
    mutate(
      { classroomId: sectionId, marks: formDatadata.marks, studentId, subjectId, termId },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.TERM_RESULT] });
          reset();
          onOpenChange(false);
        },
        onError: (error) => errorToast(error),
      },
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      <GradeForm
        formId={formId}
        key={JSON.stringify({ marks, subjectType })}
        marks={marks}
        subjectType={subjectType}
        onSubmit={handleGrading}
      />
      <Separator />
      <div className='flex items-center gap-4'>
        <Button type='submit' form={formId} className='w-full' isLoading={isPending}>
          {isPending ? (
            'Submitting Grade...'
          ) : (
            <>
              <SaveIcon className='size-4' /> Submit Grade
            </>
          )}
        </Button>

        <Button onClick={() => onOpenChange(false)} variant='outline' className='w-full'>
          <BanIcon className='size-4' />
          Cancel Grading
        </Button>
      </div>
    </div>
  );
};
