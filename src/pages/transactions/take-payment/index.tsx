import { PageTitle } from '@/components/shared/PageTitle';

export default function TakePaymentPage() {
  return (
    <>
      <PageTitle title='Take Payment' />
    </>
  );

  // return (
  //   <PageTitle title='Take Payment'>
  //     <section className='mt-6 flex w-full justify-center'>
  //       <div className='relative w-full max-w-96'>
  //         <Input
  //           ref={inputRef}
  //           className='rounded-md'
  //           placeholder='Input student id here...'
  //           onKeyDown={(event) => {
  //             if (event.key === 'Enter' && inputRef.current?.value)
  //               setSearchParam({ studentId: inputRef.current?.value || '' });
  //           }}
  //         />
  //         <Button
  //           onClick={() => setSearchParam({ studentId: inputRef.current?.value || '' })}
  //           className='absolute right-0 top-0 rounded-md'
  //         >
  //           <SearchIcon />
  //         </Button>
  //       </div>
  //     </section>
  //     {studentId ? (
  //       <>
  //         <PaymentSummary {...paymentSummary?.data!} />
  //         <Payments studentId={studentId} />
  //       </>
  //     ) : (
  //       <Message className='mt-12' message='Input student id first' />
  //     )}
  //   </PageTitle>
  // );
}
