import { StudentInfoLoader } from './StudentDashboardPageLoader';
import { Message, UserIcon } from '@/components/shared';
import { useAuthStore } from '@/stores/auth';
import { useGetStudentInfo } from '@/hooks';

export const StudentProfile = () => {
  const user = useAuthStore((state) => state.user);
  const { data: studentData, isLoading } = useGetStudentInfo(user?.id as string);

  if (isLoading) return <StudentInfoLoader />;
  if (!studentData) return <Message message='User not found' />;

  return (
    <div className='mx-auto my-6 w-fit'>
      <UserIcon username='Faisal' size='xl' className='mx-auto' />
      <div className='flex flex-col items-center text-center'>
        <h2 className='mt-4 text-xl font-semibold'>{studentData.name}</h2>
        <p className='mt-2 font-semibold'>
          Class : {studentData.class} ({studentData.classroom.name})
        </p>
        <p className='text-muted-foreground'>ID : {studentData.id}</p>
      </div>
    </div>
  );
};
