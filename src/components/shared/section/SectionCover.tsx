import { useGetClassroomDetails } from '@/hooks';
import { CoverLoader } from '../../loader';
import { FaUserSecret } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TSectionCoverProps = PropsWithChildren<{ sectionId: string; className?: string }>;

export const SectionCover = ({ sectionId, className, children }: TSectionCoverProps) => {
  const { data, isLoading } = useGetClassroomDetails(sectionId);

  if (isLoading) return <CoverLoader />;

  return (
    <div
      className={cn('flex h-60 flex-col rounded-lg bg-gradient-to-br from-primary-800 to-primary-600 p-6', className)}
    >
      <div className='mt-auto flex items-end'>
        <div className='space-y-2'>
          <h2 className='text-3xl font-semibold text-white'>
            {data?.name} ({data?.level})
          </h2>
          {data?.classTeacher && (
            <div className='flex items-center gap-2 text-xl text-white'>
              <div className='rounded-full border p-2'>
                <FaUserSecret size={16} />
              </div>
              <h3 className='font-semibold'>{data.classTeacher.name}</h3>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
