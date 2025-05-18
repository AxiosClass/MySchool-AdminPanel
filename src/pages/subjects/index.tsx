import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SubjectTable } from './SubjectTable';

export default function SubjectsPage() {
  return (
    <>
      <PageTitle title='Subjects' />
      <ScrollArea>
        <SubjectTable />
      </ScrollArea>
    </>
  );
}
