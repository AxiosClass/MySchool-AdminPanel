/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

interface IArgs {
  id: string | number;
  tryFn: () => void;
  catchFn?: (error: any) => void;
  finallyFn?: () => void;
}

export const tryCatch = async ({ id, tryFn, catchFn, finallyFn }: IArgs) => {
  return Promise.resolve(tryFn())
    .catch((error: any) => {
      console.log(error);
      if (catchFn) return catchFn(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';

      toast.error(message, { id });
    })
    .finally(() => {
      if (finallyFn) finallyFn();
    });
};
