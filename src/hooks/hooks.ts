import { QK } from '@/api';
import { getExams, getPayments } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

export const usePopupState = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  return { open, onOpenChange };
};

export const usePagination = ({ totalPage = 1 }: { totalPage: number | undefined }) => {
  const [page, setPage] = useState(1);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;

  const goToPage = useCallback((page: number) => setPage(page), []);

  const goNextPage = useCallback(() => {
    if (hasNextPage) goToPage(page + 1);
  }, [page, hasNextPage, goToPage]);

  const goPrevPage = useCallback(() => {
    if (hasPrevPage) goToPage(page - 1);
  }, [page, hasPrevPage, goToPage]);

  return { page, goToPage, goNextPage, goPrevPage, hasNextPage, hasPrevPage };
};

// data fetching
export const useGetPercentile = (year: number) => {
  return useQuery({
    queryKey: [QK.EXAM, { year }],
    queryFn: () => getExams({ year: String(year) }),
    select: (res) => res.data.reduce((acc, exam) => acc + exam.percentile, 0),
  });
};

export const useGetStudentPayments = (studentId: string) => {
  return useQuery({
    queryKey: [QK.PAYMENT, { studentId }],
    queryFn: () => getPayments({ studentId }),
    select: (res) => res.data,
    enabled: !!studentId,
  });
};
