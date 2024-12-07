import { ClassCard } from './ClassCard';
import { Message } from '@/components/shared/Message';
import { CreateClass } from './create-class/CreateClass';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetClassesQuery } from '@/data-fetching/hooks/class';
import { PageHeader } from '@/components/shared/PageHeader';
import { CardsLoader } from '@/components/loader/CardsLoader';

export default function ClassesPage() {
  const { data: classesData, isLoading, isFetching } = useGetClassesQuery();

  return (
    <PageTitle title='Classes'>
      <PageHeader label='Classes'>
        <CreateClass />
      </PageHeader>
      {isLoading || isFetching ? (
        <CardsLoader className={{ card: 'h-36' }} />
      ) : (
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
      )}
    </PageTitle>
  );
}
