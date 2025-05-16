import { PageHeader, PageTitle } from '@/components/shared';
import { NoticeList } from '@/components/shared/notice';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NoticesPageForTeacher() {
  return (
    <>
      <PageTitle title='Notices' />
      <ScrollArea className='pt-6'>
        <PageHeader label='Notices' />
        <NoticeList />
      </ScrollArea>
    </>
  );
}
