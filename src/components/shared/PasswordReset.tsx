import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { usePopupState } from '@/hooks';
import { USER_ROLE } from '@/lib/types';
import { TooltipContainer } from './TooltipContainer';
import { Button } from '../ui/button';
import { KeySquareIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

type TPasswordReset = { id: string; role: USER_ROLE };
export const PasswordReset = ({ id, role }: TPasswordReset) => {
  const { open, onOpenChange } = usePopupState();

  const { mutate, isPending } = useMutation({
    mutationFn: () => resetPassword({ userId: id, userRole: role }),
    onSuccess: (res) => {
      toast.success(res.message);
      onOpenChange(false);
    },
    onError: errorToast,
  });

  return (
    <>
      <TooltipContainer label='Reset Password'>
        <Button variant='outline' size='icon' onClick={() => onOpenChange(true)}>
          <KeySquareIcon className='size-4' />
        </Button>
      </TooltipContainer>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <DialogDescription>Are you sure that you want to reset this user&apos;s password</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button onClick={() => mutate()} isLoading={isPending}>
              {isPending ? 'Proceeding...' : 'Proceed'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
