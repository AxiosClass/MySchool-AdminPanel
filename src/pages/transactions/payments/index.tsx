import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdminPaymentTable } from './admin-payment-table';

export default function PaymentsPage() {
  return (
    <>
      <PageTitle title='Payments' />
      <ScrollArea>
        <AdminPaymentTable />
      </ScrollArea>
    </>
  );
}
