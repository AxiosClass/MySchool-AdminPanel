import { addTermResult, getStudentWithTermResult, TGetStudentWithTermResultResponse } from '@/api/query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCapIcon, NotebookPenIcon, Edit3Icon, SaveIcon, BanIcon, Edit2Icon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/components/shared';
import { usePopupState } from '@/hooks';
import { Button } from '@/components/ui/button';
import { GradeForm, TGradeForm } from './GradeForm';
import { Separator } from '@/components/ui/separator';
import { QK } from '@/api';
import { toast } from 'sonner';
import { errorToast, generateMarkReport, TSubjectType } from '@/helpers';
import { SUBJECT_TYPE } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

// Main Types
type TStudentWithResult = TGetStudentWithTermResultResponse[number];

type TStudentListWithResultProps = { sectionId: string; subjectId: string; termId: string };
export const StudentListWithResult = ({ sectionId, subjectId, termId }: TStudentListWithResultProps) => {
  const { data: students, isPending } = useQuery({
    queryKey: [QK.TERM_RESULT, { sectionId, subjectId, termId }],
    queryFn: () => getStudentWithTermResult({ classroomId: sectionId, subjectId, termId }),
    select: (res) => res.data,
  });

  if (isPending) return <GradesCardLoader />;
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
const StudentWithResult = memo(
  ({ studentName, studentId, subjectType, subjectId, marks, termId, sectionId }: TStudentWithResultProps) => {
    const { open, onOpenChange } = usePopupState();

    const { allMarks, obtainedMarks, total, grade, isAPlus, isPassed } = generateMarkReport(
      marks ?? {},
      subjectType as TSubjectType,
    );

    return (
      <Card className='bg-background'>
        <StudentInfoHeader studentId={studentId} studentName={studentName} grade={marks && grade} />
        <CardContent>
          {open && (
            <StudentGradeFormWrapper
              studentId={studentId}
              subjectId={subjectId}
              subjectType={subjectType}
              termId={termId}
              sectionId={sectionId}
              onOpenChange={onOpenChange}
              marks={marks}
            />
          )}

          {!open && (
            <>
              {marks && (
                <StudentGrade
                  subjectType={subjectType}
                  allMarks={allMarks}
                  isAPlus={isAPlus}
                  isPassed={isPassed}
                  obtainedMarks={obtainedMarks}
                  totalMarks={total}
                  onOpenChange={onOpenChange}
                />
              )}
              {!marks && <NoGrade onOpenChange={onOpenChange} />}
            </>
          )}
        </CardContent>
      </Card>
    );
  },
);

StudentWithResult.displayName = 'StudentWithResult';

type TStudentInfoHeaderProps = Pick<TStudentWithResult, 'studentId' | 'studentName'> & { grade?: string };
const StudentInfoHeader = ({ studentId, studentName, grade }: TStudentInfoHeaderProps) => {
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
        {grade && (
          <div
            className='ml-auto flex size-10 items-center justify-center rounded-md bg-primary-100 font-semibold data-[grade=A+]:bg-primary data-[grade=F]:bg-destructive data-[grade=A+]:text-white data-[grade=F]:text-white'
            data-grade={grade}
          >
            {grade}
          </div>
        )}
      </div>
    </CardHeader>
  );
};

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

type TStudentGradeProps = Pick<TStudentWithResult, 'subjectType'> & {
  onOpenChange: (open: boolean) => void;
  allMarks: Array<{ title: string; obtainedMarks: number; totalMarks: number }>;
  obtainedMarks: number;
  totalMarks: number;
  isPassed: boolean;
  isAPlus: boolean;
};

const StudentGrade = ({
  subjectType,
  onOpenChange,
  allMarks,
  obtainedMarks,
  totalMarks,
  isAPlus,
  isPassed,
}: TStudentGradeProps) => (
  <>
    <div className='flex items-center gap-2'>
      {subjectType !== SUBJECT_TYPE.WRITTEN_FULL && subjectType !== SUBJECT_TYPE.WRITTEN_HALF && (
        <>
          {allMarks.map(({ obtainedMarks, title, totalMarks }) => (
            <GradeCard title={title} obtainedMarks={obtainedMarks} totalMarks={totalMarks} />
          ))}
        </>
      )}
      <GradeCard
        title='Total'
        obtainedMarks={obtainedMarks}
        totalMarks={totalMarks}
        isPass={isPassed}
        isAPlus={isAPlus}
      />
    </div>
    <Button variant='outline' className='mt-4 w-full' onClick={() => onOpenChange(true)}>
      <Edit2Icon className='size-4' /> Edit Grade
    </Button>
  </>
);

type TGradeCardProps = {
  title: string;
  obtainedMarks: number;
  totalMarks: number;
  isPass?: boolean;
  isAPlus?: boolean;
};

const GradeCard = memo(({ title, obtainedMarks, totalMarks, isAPlus, isPass = true }: TGradeCardProps) => {
  return (
    <Card
      data-plus={isAPlus}
      data-failed={!isPass}
      className='group w-full bg-primary-100/20 data-[failed=true]:bg-destructive data-[plus=true]:bg-primary data-[failed=true]:text-white data-[plus=true]:text-white'
    >
      <CardHeader>
        <CardTitle className='font-semibold uppercase'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl font-semibold'>
          <span>{obtainedMarks}</span>/
          <span className='text-base text-muted-foreground group-data-[failed=true]:text-white/60 group-data-[plus=true]:text-white/60'>
            {totalMarks}
          </span>
        </h3>
      </CardContent>
    </Card>
  );
});

GradeCard.displayName = 'GradeCard';

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

const GradesCardLoader = () => (
  <div className='flex flex-col gap-4 p-4'>
    {Array.from({ length: 4 }).map((_, index) => (
      <GradeCardLoader key={index} />
    ))}
  </div>
);

const GradeCardLoader = () => (
  <div className='space-y-4 rounded-md border p-4'>
    <div className='flex items-center gap-2'>
      <Skeleton className='size-10' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-4 w-24' />
      </div>
      <Skeleton className='ml-auto size-10' />
    </div>
    <div className='w- flex items-center gap-4'>
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
    </div>
  </div>
);
