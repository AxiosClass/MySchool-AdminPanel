import moment from 'moment';

import {
  CommonTable,
  Pagination,
  SearchInput,
  TableNoData,
  usePagination,
  PaymentTypeBadge,
  TooltipContainer,
  StudentInfoCell,
} from '@/components/shared';

import { QK } from '@/api';
import { getPayments, TGetPaymentResult } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonSelect, DatePicker } from '@/components/shared/form';
import { dateFormatString, months } from '@/data';
import { TUseSearch, useSearch } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { PAYMENT_TYPE } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FunnelXIcon } from 'lucide-react';
import { PrintReceipt } from './PrintReceipt';

// -------------------- Main Component -------------------- \\
export const AdminPaymentTable = () => {
  const {
    value,
    onSearchChange,
    type,
    onTypeChange,
    page,
    onPageChange,
    apiResponse,
    isLoading,
    start,
    onStartChange,
    end,
    onEndChange,
    isFilterActive,
    onReset,
  } = usePayment();

  return (
    <CommonTable
      header={
        <AdminPaymentTableHeader
          value={value}
          onSearchChange={onSearchChange}
          type={type}
          onTypeChange={onTypeChange}
          start={start}
          onStartChange={onStartChange}
          end={end}
          onEndChange={onEndChange}
          isFilterActive={isFilterActive}
          onReset={onReset}
        />
      }
      head={<AdminPaymentTableHead />}
      footer={
        <Pagination page={page} onPageChange={onPageChange} totalPages={apiResponse?.meta?.totalPages ?? 0} />
      }
      tableContainerClassName='px-6 my-6'
    >
      <AdminPaymentTableBody payments={apiResponse?.payments ?? []} isLoading={isLoading} />
    </CommonTable>
  );
};

// -------------------- Sub Components -------------------- \\
type TAdminPaymentTableHeaderProps = Pick<TUseSearch, 'value' | 'onSearchChange'> & {
  type: string;
  onTypeChange: (type: string) => void;
  start?: Date;
  onStartChange: (start: Date) => void;
  end?: Date;
  onEndChange: (end: Date) => void;
  isFilterActive: boolean;
  onReset: () => void;
};

const paymentTypeOptions = [
  { label: 'ANY', value: 'ANY' },
  { label: PAYMENT_TYPE.MONTHLY_FEE, value: PAYMENT_TYPE.MONTHLY_FEE },
  { label: PAYMENT_TYPE.ADMISSION_FEE, value: PAYMENT_TYPE.ADMISSION_FEE },
  { label: PAYMENT_TYPE.TERM_FEE, value: PAYMENT_TYPE.TERM_FEE },
  { label: PAYMENT_TYPE.OTHERS, value: PAYMENT_TYPE.OTHERS },
];

const today = new Date();

const AdminPaymentTableHeader = (props: TAdminPaymentTableHeaderProps) => {
  const {
    value,
    onSearchChange,
    type,
    onTypeChange,
    start,
    onStartChange,
    end,
    onEndChange,
    isFilterActive,
    onReset,
  } = props;

  return (
    <div className='flex items-center gap-4'>
      <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search here...' />
      <CommonSelect
        className='max-w-52'
        value={type}
        options={paymentTypeOptions}
        onChange={onTypeChange}
        placeholder='Select any payment type'
      />

      <div className='flex items-center gap-2'>
        <DatePicker value={start} onChange={onStartChange} maxDate={end} />
        <span> : </span>
        <DatePicker value={end} onChange={onEndChange} minDate={start} maxDate={today} />
      </div>

      {isFilterActive && (
        <TooltipContainer label='Reset Filter'>
          <Button onClick={onReset} variant='outline' size='icon' className='ml-auto'>
            <FunnelXIcon className='size-4' />
          </Button>
        </TooltipContainer>
      )}
    </div>
  );
};

const AdminPaymentTableHead = () => (
  <>
    <TableHead>Student Info</TableHead>
    <TableHead>Section</TableHead>
    <TableHead>Amount</TableHead>
    <TableHead>Type</TableHead>
    <TableHead>Description</TableHead>
    <TableHead>Month / Year</TableHead>
    <TableHead>Paid At</TableHead>
    <TableHead>Action</TableHead>
  </>
);

type TAdminPaymentTableBody = { payments: TGetPaymentResult; isLoading: boolean };
const AdminPaymentTableBody = ({ payments, isLoading }: TAdminPaymentTableBody) => {
  if (isLoading) return <TableBodyLoader cols={8} />;
  if (!payments.length) return <TableNoData colSpan={8} message='No payment found' />;

  return payments.map((payment) => {
    const {
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

// -------------------- Hook -------------------- \\
const LIMIT = '10';
const usePayment = () => {
  const { page, onPageChange } = usePagination();
  const { value, searchTerm, onSearchChange } = useSearch();
  const [type, setType] = useState('');
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: [QK.PAYMENT, { page, searchTerm, LIMIT, type, start, end }],

    queryFn: () => {
      return getPayments({
        searchTerm,
        page: page.toString(),
        limit: LIMIT,

        ...(type && type !== 'ANY' && { type }),
        ...(start && { start: start.toISOString() }),
        ...(end && { end: end.toISOString() }),
      });
    },

    select: (res) => ({ payments: res.data, meta: res.meta }),
  });

  // handlers
  const onTypeChange = useCallback((type: string) => setType(type), []);
  const onStartChange = useCallback((start?: Date) => setStart(start), []);
  const onEndChange = useCallback((end?: Date) => setEnd(end), []);

  const onReset = useCallback(() => {
    setType('ANY');
    onSearchChange('');
    setStart(undefined);
    setEnd(undefined);
  }, [onSearchChange]);

  const isFilterActive = !!(searchTerm || type !== 'ANY' || start || end);

  return {
    page,
    onPageChange,
    value,
    onSearchChange,
    type,
    onTypeChange,
    start,
    onStartChange,
    end,
    onEndChange,
    isFilterActive,
    onReset,
    apiResponse,
    isLoading,
  };
};
