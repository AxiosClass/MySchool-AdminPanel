import moment from 'moment';

import { QK } from '@/api';
import { getPayments, TGetPaymentResult } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { CommonTable, Pagination, SearchInput, TableNoData, usePagination, UserIcon } from '@/components/shared';
import { PaymentTypeBadge } from '@/components/shared/PaymentTypeBadge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { dateFormatString, months } from '@/data';
import { TUseSearch, useSearch } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { PAYMENT_TYPE } from '@/lib/types';
import { useCallback, useState } from 'react';
import { CommonSelect } from '@/components/shared/form';

// -------------------- Main Component -------------------- \\
const LIMIT = '10';
export const AdminPaymentTable = () => {
  const { page, onPageChange } = usePagination();
  const { value, searchTerm, onSearchChange } = useSearch();
  const [type, setType] = useState('ANY');

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: [QK.PAYMENT, { page, searchTerm, LIMIT, type }],
    queryFn: () => getPayments({ searchTerm, page: page.toString(), limit: LIMIT, ...(type !== 'ANY' && { type }) }),
    select: (res) => ({ payments: res.data, meta: res.meta }),
  });

  // handlers
  const onTypeChange = useCallback((type: string) => setType(type), []);

  return (
    <CommonTable
      header={
        <AdminPaymentTableHeader
          value={value}
          onSearchChange={onSearchChange}
          type={type}
          onTypeChange={onTypeChange}
        />
      }
      head={<AdminPaymentTableHead />}
      footer={<Pagination page={page} onPageChange={onPageChange} totalPages={apiResponse?.meta?.totalPages ?? 0} />}
      tableContainerClassName='px-6 mt-6'
    >
      <AdminPaymentTableBody payments={apiResponse?.payments ?? []} isLoading={isLoading} />
    </CommonTable>
  );
};

// -------------------- Sub Components -------------------- \\

type TAdminPaymentTableHeaderProps = Pick<TUseSearch, 'value' | 'onSearchChange'> & {
  type: string;
  onTypeChange: (type: string) => void;
};

const paymentTypeOptions = [
  { label: 'ANY', value: 'ANY' },
  { label: PAYMENT_TYPE.MONTHLY_FEE, value: PAYMENT_TYPE.MONTHLY_FEE },
  { label: PAYMENT_TYPE.ADMISSION_FEE, value: PAYMENT_TYPE.ADMISSION_FEE },
  { label: PAYMENT_TYPE.TERM_FEE, value: PAYMENT_TYPE.TERM_FEE },
  { label: PAYMENT_TYPE.OTHERS, value: PAYMENT_TYPE.OTHERS },
];

const AdminPaymentTableHeader = ({ value, onSearchChange, type, onTypeChange }: TAdminPaymentTableHeaderProps) => (
  <div className='flex items-center gap-4'>
    <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search here...' />
    <CommonSelect className='max-w-40' value={type} options={paymentTypeOptions} onChange={onTypeChange} />
  </div>
);

const AdminPaymentTableHead = () => (
  <>
    <TableHead>Student Info</TableHead>
    <TableHead>Section</TableHead>
    <TableHead>Amount</TableHead>
    <TableHead>Type</TableHead>
    <TableHead>Description</TableHead>
    <TableHead>Month / Year</TableHead>
    <TableHead>Paid At</TableHead>
  </>
);

type TAdminPaymentTableBody = { payments: TGetPaymentResult; isLoading: boolean };
const AdminPaymentTableBody = ({ payments, isLoading }: TAdminPaymentTableBody) => {
  if (isLoading) return <TableBodyLoader cols={7} />;
  if (!payments.length) return <TableNoData colSpan={7} message='No payment found' />;

  return payments.map(
    ({
      id,
      studentName,
      studentId,
      studentClass,
      studentClassroomName,
      amount,
      type,
      description,
      month,
      year,
      createdAt,
    }) => (
      <TableRow key={id}>
        <TableCell>
          <div className='flex items-center gap-2'>
            <UserIcon username={studentName} />
            <div className='space-y-2'>
              <h2 className='font-semibold'>{studentName}</h2>
              <p className='text-muted-foreground'>#{studentId}</p>
            </div>
          </div>
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
      </TableRow>
    ),
  );
};
