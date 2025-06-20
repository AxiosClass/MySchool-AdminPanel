import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useCallback, useState } from 'react';

type TPaginationProps = { page: number; totalPages: number; onPageChange: (page: number) => void };

export const Pagination = ({ page, totalPages, onPageChange }: TPaginationProps) => {
  if (totalPages <= 1) return null;

  const goPrevious = () => onPageChange(page - 1);
  const goNext = () => onPageChange(page + 1);
  const goTo = (page: number) => onPageChange(page);

  return (
    <div className='sticky bottom-0 flex h-16 items-center justify-between gap-4 border-t bg-neutral-100 px-4'>
      <Button onClick={goPrevious} disabled={page === 1} variant='outline'>
        <ArrowLeftIcon className='size-4' /> Previous
      </Button>
      <div className='flex items-center gap-2 font-semibold'>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;

          if (pageNumber === page)
            return (
              <Button key={index} onCanPlay={() => goTo(pageNumber)} variant='outline' size='icon'>
                {pageNumber}
              </Button>
            );
          else if (pageNumber === 1 || pageNumber === totalPages || page + 1 === pageNumber || page - 1 === pageNumber)
            return (
              <Button key={index} onClick={() => goTo(pageNumber)} variant='ghost' size='icon'>
                {pageNumber}
              </Button>
            );
          else if (pageNumber === 2 || pageNumber === totalPages - 1) return <span key={index}> ... </span>;
          else return null;
        })}
      </div>
      <Button onClick={goNext} disabled={page === totalPages} variant='outline'>
        Next <ArrowRightIcon className='size-4' />
      </Button>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePagination = () => {
  const [page, setPage] = useState(1);
  const onPageChange = useCallback((page: number) => setPage(page), []);

  return { page, onPageChange };
};

export type TUsePagination = ReturnType<typeof usePagination>;
