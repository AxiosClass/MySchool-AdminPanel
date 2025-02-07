import { PageHeader } from '@/components/shared';
import { PageTitle } from '@/components/shared/PageTitle';
import { AddStudent } from './AddStudent';

export default function StudentsPage() {
  return (
    <>
      <PageTitle title='Students' />
      <PageHeader label='Students'>
        <AddStudent />
      </PageHeader>
    </>
  );

  // return (
  //   <PageTitle title='Students'>
  //     <PageHeader label='Students'>{/* <AddStudent /> */}</PageHeader>
  //     {isLoading || isFetching ? (
  //       <TableLoader />
  //     ) : (
  //       <>
  //         {studentsInfo?.data && studentsInfo.data.length ? (
  //           <CustomTable
  //             head={
  //               <>
  //                 <TableHead>Name</TableHead>
  //                 <TableHead>Class</TableHead>
  //                 <TableHead>Address</TableHead>
  //                 <TableHead>Guardian</TableHead>
  //                 <TableHead className='text-right'>Admitted At</TableHead>
  //               </>
  //             }
  //           >
  //             {studentsInfo.data.map(({ id, name, class: classInfo, classroom, guardian, address, admittedAt }) => (
  //               <TableRow className='border-b' key={id}>
  //                 <TableCell>
  //                   <div className='flex gap-4'>
  //                     <UserIcon username={name} />
  //                     <div>
  //                       <p className='text-base font-semibold'>{name}</p>
  //                       <p className='text-sm text-muted-foreground'>ID : {id}</p>
  //                     </div>
  //                   </div>
  //                 </TableCell>
  //                 <TableCell>
  //                   <p className='text-base font-semibold'>Class : {classInfo}</p>
  //                   <p className='text-sm text-muted-foreground'>Section : {classroom.name}</p>
  //                 </TableCell>
  //                 <TableCell>{address}</TableCell>
  //                 <TableCell>
  //                   <p className='text-base font-semibold'> {guardian.name}</p>
  //                   <p className='text-sm text-muted-foreground'>Cell : {guardian.phone}</p>
  //                 </TableCell>
  //                 <TableCell className='text-right capitalize'>{format(admittedAt, 'PPP')}</TableCell>
  //               </TableRow>
  //             ))}
  //           </CustomTable>
  //         ) : (
  //           <Message message='No student found' />
  //         )}
  //       </>
  //     )}
  //   </PageTitle>
  // );
}
