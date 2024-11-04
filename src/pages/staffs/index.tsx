import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { GET_STAFFS, IGetStaffsResponse } from '@/lib/queries';
import { UserIcon } from '@/components/shared/UserIcon';
import { Message } from '@/components/shared/Message';
import { PageTitle } from '@/components/shared';
import { useQuery } from '@apollo/client';
import { AddStaff } from './add-staff';
import { format } from 'date-fns';

export default function StaffsPage() {
  const { data: staffData, loading: isLoading } =
    useQuery<IGetStaffsResponse>(GET_STAFFS);

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Staffs'>
      <section className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Staffs</h1>
        <AddStaff />
      </section>
      {staffData && staffData.staffs.length > 0 ? (
        <section className='mt-6 w-full overflow-hidden rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Info</TableHead>
                {/* to do => in staff info we will display => name,  designation, blood group and phone */}
                <TableHead>Salary</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffData.staffs.map((staff) => (
                <TableRow className='border-b' key={staff.id}>
                  <TableCell>
                    <div className='flex gap-2'>
                      <UserIcon username={staff.name} />
                      <div>
                        <p className='text-base font-semibold'>{staff.name}</p>
                        <p className='mt-1 text-xs'>{staff.designation}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.salary} TK</TableCell>
                  <TableCell>{staff.address}</TableCell>
                  <TableCell className='capitalize'>{staff.role}</TableCell>
                  <TableCell className='capitalize'>
                    {format(staff.joinedAt, 'PPP')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <Message message='No Data Found' />
      )}
    </PageTitle>
  );
}
