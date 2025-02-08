import { PageHeader, PageTitle } from '@/components/shared';
import { AddNotice } from './AddNotice';

export default function NoticesPage() {
  return (
    <>
      <PageTitle title='Notices' />
      <PageHeader label='Notices'>
        <AddNotice />
      </PageHeader>
    </>
  );
}
