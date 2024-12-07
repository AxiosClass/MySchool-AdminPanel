import { format } from 'date-fns';
import { Message } from '@/components/shared/Message';
import { AddTeacher } from './add-teacher/AddTeacher';
import { UserIcon } from '@/components/shared/UserIcon';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetTeachersQuery } from '@/data-fetching/hooks/teacher';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CustomTable } from '@/components/shared/CustomTable';
import { PageHeader } from '@/components/shared/PageHeader';
import { TableLoader } from '@/components/loader/TableLoader';

export default function TeachersPage() {
  const { data: teachersData, isLoading } = useGetTeachersQuery();

  return (
    <PageTitle title='Teachers'>
      <PageHeader label='Teachers'>
        <AddTeacher />
      </PageHeader>
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          {teachersData?.data && teachersData?.data?.length > 0 ? (
            <>
              <CustomTable
                head={
                  <>
                    <TableHead>Teacher Info</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead className='text-right'>Joined at</TableHead>
                  </>
                }
              >
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
              </CustomTable>
            </>
          ) : (
            <Message message='No Teacher Found' />
          )}
        </>
      )}
    </PageTitle>
  );
}
