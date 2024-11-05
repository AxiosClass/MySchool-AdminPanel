import { GET_CLASSES, IGetClassResponse } from '@/lib/queries';
import { PageTitle, Message } from '@/components/shared';
import { CreateClass } from './create-class';
import { useQuery } from '@apollo/client';
import { ClassCard } from './ClassCard';

export default function ClassesPage() {
  const { data: classData, loading: isLoading } =
    useQuery<IGetClassResponse>(GET_CLASSES);

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Classes'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Classes</h1>
        <CreateClass />
      </div>
      {classData?.classes && classData.classes.length > 0 ? (
        <section className='mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {classData.classes.map((eachClass) => (
            <ClassCard key={eachClass.id} {...eachClass} />
          ))}
        </section>
      ) : (
        <Message message='No Class Found!' />
      )}
    </PageTitle>
  );
}
