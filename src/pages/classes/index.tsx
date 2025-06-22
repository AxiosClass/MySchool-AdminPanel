import { QK } from '@/api';
import { PageTitle, PageHeader, Message } from '@/components/shared';
import { useQuery } from '@tanstack/react-query';
import { CardsLoader } from '@/components/loader';
import { getClasses } from '@/api/query';
import { CreateClass } from './CreateClass';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClassCard } from './ClassCard';

export default function ClassesPage() {
  return (
    <>
      <PageTitle title='Classes' />
      <ScrollArea>
        <PageHeader label='Classes'>
          <CreateClass />
        </PageHeader>
        <ClassList />
      </ScrollArea>
    </>
  );
}

const ClassList = () => {
  const { data: classesData, isLoading } = useQuery({ queryKey: [QK.CLASS], queryFn: getClasses });

  if (isLoading) return <CardsLoader size={3} />;
  if (!classesData?.data.length) return <Message message='No Class Found!' />;

  return (
    <section className='mb-6 grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3'>
      {classesData.data.map((cls) => (
        <ClassCard key={cls.id} {...cls} />
      ))}
    </section>
  );
};
