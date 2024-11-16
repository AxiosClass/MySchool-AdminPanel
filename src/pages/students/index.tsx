import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Message, PageTitle, UserIcon } from '@/components/shared';
import { GET_STUDENTS, IGetStudentsResponse } from '@/lib/queries';
import { AddStudent } from './add-student';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';

export default function StudentsPage() {
  const { data: studentsData, loading: isLoading } =
    useQuery<IGetStudentsResponse>(GET_STUDENTS);

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Students'>
      <section className='flex items-center justify-between pt-6'>
        <h1 className='text-xl font-semibold'>Students</h1>
        <AddStudent />
      </section>
      {studentsData && studentsData.students.length > 0 ? (
        <section className='mt-6 w-full overflow-hidden rounded-md border-4 border-primary-50'>
          <Table>
            <TableHeader>
              <TableRow className='border-none'>
                <TableHead>Id</TableHead>
                <TableHead>Student Info</TableHead>
                <TableHead className='text-center'>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Admitted at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData.students.map(
                ({ id, name, class: studentsClass, admittedAt, classroom }) => (
                  <TableRow className='border-b-4 border-primary-50' key={id}>
                    <TableCell className='w-32'>{id}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <UserIcon username={name} />
                        <div>
                          <p className='text-base font-semibold'>{name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='text-center'>
                      {studentsClass}
                    </TableCell>
                    <TableCell>{classroom.name}</TableCell>
                    <TableCell className='capitalize'>
                      {format(admittedAt, 'PPP')}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </section>
      ) : (
        <Message message='No Teacher Found' />
      )}
    </PageTitle>
  );
}
