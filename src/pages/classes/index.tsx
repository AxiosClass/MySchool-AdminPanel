import { PageTitle } from '@/components/shared/PageTitle';
import { CreateClass } from './create-class';

export default function ClassesPage() {
  return (
    <PageTitle title='Classes'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Classes</h1>
        <CreateClass />
      </div>
      {/* {classData?.classes && classData.classes.length > 0 ? (
        <section className='mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {classData.classes.map((eachClass) => (
            <ClassCard key={eachClass.id} {...eachClass} />
          ))}
        </section>
      ) : (
        <Message message='No Class Found!' />
      )} */}
    </PageTitle>
  );
}
