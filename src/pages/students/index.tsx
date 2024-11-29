import { PageTitle } from '@/components/shared/PageTitle';
import { AddStudent } from './add-student/AddStudent';
import { useGetStudents } from '@/data-fetching/hooks/student';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserIcon } from '@/components/shared/UserIcon';
import { format } from 'date-fns';

export default function StudentsPage() {
  const { data: studentsInfo, isLoading } = useGetStudents();

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Students'>
      <section className='mt-6 flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Students</h1>
        <AddStudent />
      </section>
      <section>
        {studentsInfo?.data && studentsInfo.data.length ? (
          <section className='mt-6 w-full overflow-hidden rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow className='border-none'>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className='text-right'>Joined at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsInfo.data.map(({ id, name, address, guardian, admittedAt, class: classInfo, classroom }) => (
                  <TableRow className='border-b' key={id}>
                    <TableCell>
                      <div className='flex gap-4'>
                        <UserIcon username={name} />
                        <div>
                          <p className='text-base font-semibold'>{name}</p>
                          <p className='text-sm text-muted-foreground'>ID : {id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className='text-base font-semibold'>Class : {classInfo}</p>
                      <p className='text-sm text-muted-foreground'>Section : {classroom.name}</p>
                    </TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>
                      <p className='text-base font-semibold'> {guardian.name}</p>
                      <p className='text-sm text-muted-foreground'>Cell : {guardian.phone}</p>
                    </TableCell>
                    <TableCell className='text-right capitalize'>{format(admittedAt, 'PPP')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        ) : (
          <></>
        )}
      </section>
    </PageTitle>
  );
}
