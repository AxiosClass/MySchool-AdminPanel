import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useGetTeachersQuery } from '@/data-fetching/queries/teacher/getTeachers';
import { PageTitle } from '@/components/shared/PageTitle';
import { AddTeacher } from './add-teacher/AddTeacher';
import { Message } from '@/components/shared/Message';
import { UserIcon } from '@/components/shared/UserIcon';
import { format } from 'date-fns';

export default function TeachersPage() {
  const { data: teachersData, isLoading } = useGetTeachersQuery();
  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Teachers'>
      <section className='mt-6 flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Teachers</h1>
        <AddTeacher />
      </section>
      {teachersData?.data && teachersData?.data?.length > 0 ? (
        <section className='mt-6 w-full overflow-hidden rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='border-none'>
                <TableHead>Teacher Info</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className='text-right'>Joined at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachersData.data.map(({ id, name, salary, joinedAt, classroomsClassTeacher, phone }) => (
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
                  <TableCell>{phone}</TableCell>
                  <TableCell>
                    <div>
                      <p className='text-base font-semibold'>
                        {classroomsClassTeacher?.length > 0 ? (
                          <>
                            {classroomsClassTeacher?.[0]?.name} ({classroomsClassTeacher[0]?.class?.level})
                          </>
                        ) : (
                          <>N/A</>
                        )}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{salary} TK</TableCell>
                  <TableCell className='text-right capitalize'>{format(joinedAt, 'PPP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <Message message='No Teacher Found' />
      )}
    </PageTitle>
  );
}
