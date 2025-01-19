import { QK } from '@/api';
import { PageTitle, PageHeader, Message } from '@/components/shared';
import { CreateClass } from './create-class/CreateClass';
import { useQuery } from '@tanstack/react-query';
import { CardsLoader } from '@/components/loader';
import { getClasses } from '@/api/query';
import { ClassCard } from './ClassCard';

export default function ClassesPage() {
  return (
    <PageTitle title='Classes'>
      <PageHeader label='Classes'>{/* <CreateClass /> */}</PageHeader>
      <ClassList />
    </PageTitle>
  );
}

const ClassList = () => {
  const { data: classesData, isLoading } = useQuery({ queryKey: [QK.CLASS], queryFn: getClasses });
  if (isLoading) return <CardsLoader className={{ card: 'h-36' }} />;

  return (
    <>
      {classesData?.data && classesData.data.length ? (
        <section className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {classesData.data.map((eachClass) => (
            <ClassCard key={eachClass.id} {...eachClass} />
          ))}
        </section>
      ) : (
        <Message message='No Class Found!' />
      )}
    </>
  );
};
