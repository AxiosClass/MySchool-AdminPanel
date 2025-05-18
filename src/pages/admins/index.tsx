import { PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateAdmin } from './CreateAdmin';
import { AdminsTable } from './AdminTable';

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
