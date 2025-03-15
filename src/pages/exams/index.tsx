import { PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function ExamsPage() {
  return (
    <>
      <PageTitle title='Exams' />
      <ScrollArea>
        <PageHeader label='Exams'></PageHeader>
      </ScrollArea>
    </>
  );
}
