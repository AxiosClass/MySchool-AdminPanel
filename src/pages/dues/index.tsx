import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DueByClassroom } from './DueByClassroom';

export default function DuesPage() {
  return (
    <>
      <PageTitle title='Dues' />
      <ScrollArea>
        <section className='p-6'>
          <DueByClassroom />
        </section>
      </ScrollArea>
    </>
  );
}
