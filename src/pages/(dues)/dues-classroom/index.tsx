import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DueByClassroom } from './DueByClassroom';
import { DuesTable } from './DuesTable';

export default function DuesClassroomPage() {
  return (
    <>
      <PageTitle title='Dues' />
      <ScrollArea>
        <section className='space-y-6 p-6'>
          <DueByClassroom />
          <DuesTable />
        </section>
      </ScrollArea>
    </>
  );
}
