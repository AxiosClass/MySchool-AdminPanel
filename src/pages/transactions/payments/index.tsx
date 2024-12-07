import { TableLoader } from '@/components/loader/TableLoader';
import { Message } from '@/components/shared/Message';
import { PageHeader } from '@/components/shared/PageHeader';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetPaymentsQuery } from '@/data-fetching/hooks/payment';
import { PaymentsTable } from '../shared/PaymentsTable';

export default function PaymentsPage() {
  const { data: paymentsData, isLoading, isFetching } = useGetPaymentsQuery({});

  return (
    <PageTitle title='Payments'>
      <PageHeader label='Payments' />
      {isLoading || isFetching ? (
        <TableLoader />
      ) : (
        <>
          {paymentsData?.data && paymentsData.data.length ? (
            <PaymentsTable payments={paymentsData.data} />
          ) : (
            <>
              <Message message='No Payment Found' />
            </>
          )}
        </>
      )}
    </PageTitle>
  );
}
