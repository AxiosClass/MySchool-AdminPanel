import { QK } from '@/api';
import { getPayments } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { CommonTable, PaymentTypeBadge, StudentInfoCell, TableNoData } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PrintReceipt } from '../payments/admin-payment-table/PrintReceipt';
import { dateFormatString, months } from '@/data';
import moment from 'moment';

export const RecentPayments = () => (
  <CommonTable header={<Header />} head={<Head />}>
    <Body />
  </CommonTable>
);

const Header = () => (
  <div className='flex items-center justify-between gap-4'>
    <h2 className='text-lg font-semibold'>Recent Payments.</h2>
    <Link to='/transactions/take-payment'>
      <Button>Take Payment</Button>
    </Link>
  </div>
);

const Head = () => (
  <>
    <TableHead>Student Info</TableHead>
    <TableHead>Section</TableHead>
    <TableHead>Amount</TableHead>
    <TableHead>Type</TableHead>
    <TableHead>Description</TableHead>
    <TableHead>Month / Year</TableHead>
    <TableHead>Paid At</TableHead>
    <TableHead>Actions</TableHead>
  </>
);

const Body = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: [QK.PAYMENT],
    queryFn: () => getPayments(),
    select: (res) => res.data,
  });

  if (isLoading) return <TableBodyLoader cols={8} />;
  if (!payments) return <TableNoData colSpan={8} message='No payment found' />;

  return payments.map((payment) => {
    const {
      id,
      studentId,
      studentName,
      studentClassroomName,
      studentClass,
      amount,
      type,
      description,
      month,
      year,
      createdAt,
    } = payment;

    return (
      <TableRow key={id}>
        <TableCell>
          <Link to={`/student/${studentId}`} className='flex items-center gap-2'>
            <StudentInfoCell id={studentId} name={studentName} />
          </Link>
        </TableCell>
        <TableCell className='font-medium'>
          {studentClassroomName} ({studentClass})
        </TableCell>
        <TableCell className='font-semibold'>{amount}</TableCell>
        <TableCell>
          <PaymentTypeBadge type={type} />
        </TableCell>
        <TableCell className='font-medium text-muted-foreground'>{description || 'N/A'}</TableCell>
        <TableCell>
          {month && months[month]} {year}
        </TableCell>
        <TableCell>{moment(createdAt).format(dateFormatString.basic)}</TableCell>
        <TableCell>
          <PrintReceipt payment={payment} />
        </TableCell>
      </TableRow>
    );
  });
};
