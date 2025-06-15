import { QK } from '@/api';
import { getPayments } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { Message, PageTitle } from '@/components/shared';
import { useQuery } from '@tanstack/react-query';
import { PaymentsTable } from '../shared/PaymentsTable';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PaymentsPage() {
  return (
    <ScrollArea>
      <PageTitle title='Payments' />
      <PaymentList />
    </ScrollArea>
  );
}

const PaymentList = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: [QK.PAYMENT],
    queryFn: () => getPayments({}),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;
  if (!payments?.length) return <Message message='No Payments Found' className='my-6' />;

  return <PaymentsTable payments={payments} tableClassName='m-6' />;
};
