import { toast } from 'sonner';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IArgs {
  id: string | number;
  tryFn: () => void;
  catchFn?: (error: any) => void;
  finallyFn?: () => void;
}

export const tryCatch = async ({ id, tryFn, catchFn, finallyFn }: IArgs) => {
  return Promise.resolve(tryFn())
    .catch((error: any) => {
      if (catchFn) return catchFn(error);
      if (error instanceof Error) return toast.error(error.message, { id });
      return toast.error(error?.data?.message || 'Something went wrong', {
        id,
      });
    })
    .finally(() => {
      if (finallyFn) finallyFn();
    });
};
