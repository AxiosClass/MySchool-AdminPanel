import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DuesTable } from './DuesTable';

export default function DuesClassroomPage() {
  return (
    <>
      <PageTitle title='Section Dues' />
      <ScrollArea>
        <DuesTable />
      </ScrollArea>
    </>
  );
}
