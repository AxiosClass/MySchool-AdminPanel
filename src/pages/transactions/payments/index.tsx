import { PageTitle } from '@/components/shared';

export default function PaymentsPage() {
  return (
    <>
      <PageTitle title='Payments' />
    </>
  );
  // const { data: paymentsData, isLoading, isFetching } = useGetPaymentsQuery({});

  // return (
  //   <PageTitle title='Payments'>
  //     <PageHeader label='Payments' />
  //     {isLoading || isFetching ? (
  //       <TableLoader />
  //     ) : (
  //       <>
  //         {paymentsData?.data && paymentsData.data.length ? (
  //           <PaymentsTable payments={paymentsData.data} />
  //         ) : (
  //           <>
  //             <Message message='No Payment Found' />
  //           </>
  //         )}
  //       </>
  //     )}
  //   </PageTitle>
  // );
}
