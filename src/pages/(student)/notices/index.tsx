import { PageTitle } from '@/components/shared';
import { NoticeList } from '@/components/shared/notice';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NoticesPageForStudent() {
  return (
    <>
      <PageTitle title='Notices' />
      <ScrollArea className='pt-6'>
        <NoticeList />
      </ScrollArea>
    </>
  );
}
