import { CommonSelect } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useGetTeacherSubjects, usePopupState } from '@/hooks';
import { BookPlusIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { StudentListWithResult } from './StudentListWithResult';
import { ScrollArea } from '@/components/ui/scroll-area';

type TAddGradeProps = { sectionId: string; termId: string };

export const AddGrade = ({ sectionId, termId }: TAddGradeProps) => {
  const { open, onOpenChange } = usePopupState();
  const [subject, setSubject] = useState<string>('');

  const onSubjectChange = useCallback((subject: string) => setSubject(subject), []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <BookPlusIcon size={16} />
          Add Grade
        </Button>
      </SheetTrigger>
      <SheetContent className='flex h-screen flex-col gap-0 p-0'>
        <SheetHeader className='flex-row items-center justify-between gap-4 border-b p-4'>
          <SheetTitle>Add Grade</SheetTitle>
          <SubjectSelection sectionId={sectionId} subject={subject} onSubjectChange={onSubjectChange} />
        </SheetHeader>
        <ScrollArea className='grow'>
          {!subject && (
            <p className='my-6 text-center font-semibold text-muted-foreground'>Please select a subject first</p>
          )}
          {subject && <StudentListWithResult sectionId={sectionId} subjectId={subject} termId={termId} />}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

type TSubjectSelectionProps = { sectionId: string; subject: string; onSubjectChange: (subject: string) => void };

const SubjectSelection = ({ sectionId, subject, onSubjectChange }: TSubjectSelectionProps) => {
  const { data: subjects, isLoading } = useGetTeacherSubjects(sectionId);

  const subjectOptions = useMemo(() => {
    return subjects?.map(({ id, name }) => ({ label: name, value: id })) || [];
  }, [subjects]);

  return (
    <CommonSelect
      className='max-w-80'
      options={subjectOptions}
      value={subject}
      onChange={onSubjectChange}
      isLoading={isLoading}
    />
  );
};
