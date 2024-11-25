import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { PageTitle } from '@/components/shared/PageTitle';
import { AddTeacher } from './add-teacher/AddTeacher';

export default function TeachersPage() {
  return (
    <PageTitle title='Teachers'>
      <section className='mt-6 flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Teachers</h1>
        <AddTeacher />
      </section>
      {/* {teachersData && teachersData.teachers.length > 0 ? (
        <section className='mt-6 w-full overflow-hidden rounded-md border-4 border-primary-50'>
          <Table>
            <TableHeader>
              <TableRow className='border-none'>
                <TableHead>Teacher Info</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Joined at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachersData.teachers.map(
                ({ id, name, salary, address, joinedAt }) => (
                  <TableRow className='border-b-4 border-primary-50' key={id}>
                    <TableCell>
                      <div className='flex gap-2'>
                        <UserIcon username={name} />
                        <div>
                          <p className='text-base font-semibold'>{name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{salary} TK</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell className='capitalize'>
                      {format(joinedAt, 'PPP')}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </section>
      ) : (
        <Message message='No Teacher Found' />
      )} */}
    </PageTitle>
  );
}
