import { QK } from '@/api';
import { getAdmins, TGetAdminQueryResult } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { CommonTable, UserIcon } from '@/components/shared';
import { TableNoData } from '@/components/shared/TableNodata';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { DeleteAdmin } from './DeleteAdmin';
import { ResetAdminPassword } from './ResetAdminPassword';
import { useMemo } from 'react';

export const AdminsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.ADMINS],
    queryFn: () => getAdmins({}),
    select: (res) => res.data,
  });

  const tableHead = useMemo(() => {
    return (
      <>
        <TableHead>Admin Info</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Actions</TableHead>
      </>
    );
  }, []);

  if (isLoading) return <TableLoader />;

  return (
    <CommonTable head={tableHead} tableContainerClassName='px-6'>
      <AdminTableBody admins={data} />
    </CommonTable>
  );
};

type TAdminTableBodyProps = { admins: TGetAdminQueryResult | undefined };

const AdminTableBody = ({ admins }: TAdminTableBodyProps) => {
  if (!admins?.length) return <TableNoData message='No admin found!' colSpan={4} />;

  return admins.map(({ id, name, role }) => (
    <TableRow key={id}>
      <TableCell>
        <div className='flex items-center gap-4'>
          <UserIcon username={name} />
          <h3 className='font-semibold'>{name}</h3>
        </div>
      </TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Badge>{role}</Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          <DeleteAdmin email={id} />
          <ResetAdminPassword email={id} />
        </div>
      </TableCell>
    </TableRow>
  ));
};
