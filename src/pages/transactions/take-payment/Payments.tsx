import { Message } from '@/components/shared/Message';
import { PaymentsTable } from '../shared/PaymentsTable';
import { useGetPaymentsQuery } from '@/data-fetching/hooks/payment';
import { TableLoader } from '@/components/loader/TableLoader';

export function Payments({ studentId }: { studentId: string }) {
  const { data: paymentsData, isLoading } = useGetPaymentsQuery({ studentId });

  if (isLoading) return <TableLoader />;

  return (
    <>
      {paymentsData?.data && paymentsData.data.length > 0 ? (
        <PaymentsTable className={{ table: 'mt-12' }} payments={paymentsData.data} />
      ) : (
        <Message className='mt-12' message='No payments found' />
      )}
    </>
  );
}
