import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useAddPayment } from './useAddPayment';

export function AddPayment() {
  const {
    states: { isOpen, setIsOpen },
  } = useAddPayment();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Make Payment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
          <DialogDescription>Provide the following information</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
