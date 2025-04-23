import { QK } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { getClassroomsForTeacher } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { CardsLoader } from '@/components/loader';
import { ClassroomCard } from '@/components/shared/ClassroomCard';

export default function TeacherDashboardPage() {
  const user = useAuthStore((state) => state.user);

  const { data: classroomList, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { teacherId: user?.id }],
    queryFn: () => getClassroomsForTeacher(user?.id as string),
    enabled: !!user?.id,
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader />;

  return (
    <section className='my-6 grid gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {classroomList?.asClassTeacher.map((classroom) => (
        <ClassroomCard key={classroom.id} {...classroom} linkPrefix='/teacher/classroom' isClassTeacher />
      ))}
      {classroomList?.asSubjectTeacher.map((classroom) => (
        <ClassroomCard key={classroom.id} {...classroom} linkPrefix='/teacher/classroom' />
      ))}
    </section>
  );
}
