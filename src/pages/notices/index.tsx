import { QK } from '@/api';
import { Message, PageHeader, PageTitle } from '@/components/shared';
import { AddNotice } from './AddNotice';
import { useQuery } from '@tanstack/react-query';
import { getNotices } from '@/api/query/noticeQuery';
import { NoticeCard } from '@/components/shared/notice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardsLoader } from '@/components/loader';

export default function NoticesPage() {
  return (
    <>
      <PageTitle title='Notices' />
      <ScrollArea>
        <PageHeader label='Notices'>
          <AddNotice />
        </PageHeader>
        <NoticeList />
      </ScrollArea>
    </>
  );
}

const NoticeList = () => {
  const { data: notices, isLoading } = useQuery({
    queryKey: [QK.NOTICE],
    queryFn: () => getNotices({}),
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader />;
  if (!notices?.length) return <Message message='No Notices Found!' className='mt-4' />;

  return (
    <div className='grid gap-4 px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} deleteNotice updateNotice showNoticeFor />
      ))}
    </div>
  );
};
