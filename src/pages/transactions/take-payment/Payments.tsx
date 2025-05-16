import { Message } from '@/components/shared/Message';
import { PaymentsTable } from '../shared/PaymentsTable';
import { TableLoader } from '@/components/loader';
import { useGetStudentPayments } from '@/hooks';

export const Payments = ({ studentId }: { studentId: string }) => {
  const { data: payments, isLoading } = useGetStudentPayments(studentId);

  if (isLoading) return <TableLoader className='mt-12' />;
  if (!payments?.length) return <Message className='mt-12' message='No Payments Found' />;

  return <PaymentsTable className={{ table: 'mt-12' }} payments={payments} />;
};
