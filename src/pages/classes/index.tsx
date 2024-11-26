import { ClassCard } from './ClassCard';
import { Message } from '@/components/shared/Message';
import { CreateClass } from './create-class/CreateClass';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetClassesQuery } from '@/data-fetching/hooks/class';

export default function ClassesPage() {
  const { data: classesData, isLoading } = useGetClassesQuery();

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Classes'>
      <div className='mt-6 flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Classes</h1>
        <CreateClass />
      </div>

      {classesData?.data && classesData.data.length ? (
        <section className='mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {classesData.data.map((eachClass) => (
            <ClassCard key={eachClass.id} {...eachClass} />
          ))}
        </section>
      ) : (
        <Message message='No Class Found!' />
      )}
    </PageTitle>
  );
}
