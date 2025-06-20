import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { resetAdminPassword } from '@/api/query';
import { TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { KeySquareIcon } from 'lucide-react';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

type TResetAdminPasswordProps = { email: string };

export const ResetAdminPassword = ({ email }: TResetAdminPasswordProps) => {
  const { open, onOpenChange } = usePopupState();

  const { mutate, isPending } = useMutation({
    mutationFn: () => resetAdminPassword(email),
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
          <KeySquareIcon size={16} />
        </Button>
      </TooltipContainer>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <DialogDescription>Are you sure that you want to reset this admin&apos;s password</DialogDescription>
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
