import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMutating } from '@tanstack/react-query';

export const FormSheet = ({
  open,
  onOpenChange,
  formId,
  title,
  description,
  children,
  submitButtonTitle,
  submitLoadingTitle,
}: TFormSheetProps) => {
  const isMutating = useIsMutating({ mutationKey: [formId] });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex h-dvh flex-col'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <ScrollArea className='grow'>{children}</ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='destructive'>Cancel</Button>
          </SheetClose>
          <Button form={formId} type='submit' isLoading={!!isMutating}>
            {isMutating ? submitLoadingTitle || 'Submitting...' : submitButtonTitle || 'Submit'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

// type
type TFormSheetProps = {
  formId: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitButtonTitle?: string;
  submitLoadingTitle?: string;
  open: boolean;
  onOpenChange(open: boolean): void;
};
