import { PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddSubject } from './AddSubject';

export default function SubjectsPage() {
  return (
    <>
      <PageTitle title='Subjects' />
      <ScrollArea>
        <PageHeader label='Subjects.'>
          <AddSubject />
        </PageHeader>
      </ScrollArea>
    </>
  );
}
