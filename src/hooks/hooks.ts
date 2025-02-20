import { useCallback, useState } from 'react';

export const usePopupState = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  return { open, onOpenChange };
};

export const usePagination = ({ totalPage = 1 }: { totalPage: number | undefined }) => {
  const [page, setPage] = useState(1);

  const goToPage = useCallback((page: number) => setPage(page), []);

  const goNextPage = useCallback(() => {
    if (hasNextPage) goToPage(page + 1);
  }, [page]);

  const goPrevPage = useCallback(() => {
    if (hasPrevPage) goToPage(page - 1);
  }, [page]);

  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;

  return { page, goToPage, goNextPage, goPrevPage, hasNextPage, hasPrevPage };
};
