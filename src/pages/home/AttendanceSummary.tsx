import { QK } from '@/api';
import { getAttendanceSummary } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { AttendanceSummarySkeleton } from './DashboardLoader';
import { HiOutlineTrendingUp } from 'react-icons/hi';

export const AttendanceSummary = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.META_DATA, 'SUMMARY'],
    queryFn: getAttendanceSummary,
    select: (res) => res.data,
  });

  if (isLoading) return <AttendanceSummarySkeleton />;

  return (
    <section className='grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3'>
      <SummaryCard title='Total Students' amount={data?.totalStudents || 0} />
      <SummaryCard title='Present' amount={data?.present || 0} />
      <SummaryCard title='Absent' amount={data?.absent || 0} />
    </section>
  );
};

type SummaryCardProps = { title: string; amount: number };
const SummaryCard = ({ title, amount }: SummaryCardProps) => (
  <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
    <h3 className='text-lg font-semibold'>{title}</h3>
    <div className='mt-2 flex items-center justify-between gap-2'>
      <h2 className='text-3xl font-bold'>{amount}</h2>
      <HiOutlineTrendingUp className='text-3xl' />
    </div>
  </div>
);
