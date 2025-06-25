import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AttendanceTrends } from './AttendanceTrends';
import { PaymentTrends } from './PaymentTrends';
import { Overview } from './Overview';

export default function HomePage() {
  return (
    <>
      <PageTitle title='Dashboard' />
      <ScrollArea>
        <section className='space-y-6 p-6'>
          <Overview />
          <div className='flex gap-6'>
            <AttendanceTrends />
            <PaymentTrends />
          </div>
        </section>
      </ScrollArea>
    </>
  );
}
