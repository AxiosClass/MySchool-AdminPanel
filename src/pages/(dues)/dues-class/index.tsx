import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DuesByClass } from './DuesByClass';

export default function DuesClassPage() {
  return (
    <>
      <PageTitle title='Dues' />
      <ScrollArea className='px-6'>
        <DuesByClass />
      </ScrollArea>
    </>
  );
}
