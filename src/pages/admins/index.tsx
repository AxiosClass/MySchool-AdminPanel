import { QK } from '@/api';
import { Badge } from '@/components/ui/badge';
import { CommonTable, Message, PageHeader, PageTitle, UserIcon } from '@/components/shared';
import { getAdmins, TGetAdminQueryResult } from '@/api/query';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { TableLoader } from '@/components/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { CreateAdmin } from './CreateAdmin';

export default function AdminsPage() {
  return (
    <>
      <PageTitle title='Admins' />
      <ScrollArea>
        <PageHeader label='Admins'>
          <CreateAdmin />
        </PageHeader>
        <AdminsTable />
      </ScrollArea>
    </>
  );
}

const AdminsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.ADMINS],
    queryFn: () => getAdmins({}),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Admin Info</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      <AdminTableBody admins={data} />
    </CommonTable>
  );
};

type TAdminTableBodyProps = { admins: TGetAdminQueryResult | undefined };

const AdminTableBody = ({ admins }: TAdminTableBodyProps) => {
  if (!admins?.length) return <NoAdminFound />;

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
        {/* <Button>Delete Admin</Button>
        <Button>Reset Password</Button> */}
      </TableCell>
    </TableRow>
  ));
};

const NoAdminFound = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <Message message='No admin found' className='py-6' />
    </TableCell>
  </TableRow>
);
