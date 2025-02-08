import { QK } from '@/api';
import { Message } from '@/components/shared/Message';
import { PaymentsTable } from '../shared/PaymentsTable';
import { TableLoader } from '@/components/loader/TableLoader';
import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/api/query';

export function Payments({ studentId }: { studentId: string }) {
  const { data: payments, isLoading } = useQuery({
    queryKey: [QK.PAYMENT, { studentId }],
    queryFn: () => getPayments({ studentId }),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader className='mt-12' />;
  if (!payments?.length) return <Message className='mt-12' message='No Payments Found' />;

  return <PaymentsTable className={{ table: 'mt-12' }} payments={payments} />;
}
