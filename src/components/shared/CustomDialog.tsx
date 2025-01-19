import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { XIcon } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react';

interface IProps {
  title: string;
  description?: string;
  asChild?: boolean;
  trigger: ReactNode;
  control?: { isDialogOpen: boolean; setIsDialogOpen: Dispatch<SetStateAction<boolean>> };
  header?: ReactNode;
  children: ReactNode;
  showClose?: boolean;
}

export const CustomDialog = ({
  control,
  trigger,
  asChild,
  header,
  title,
  description,
  showClose = true,
  children,
}: IProps) => {
  const dialogContent = useMemo(() => {
    return (
      <>
        {trigger && <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>}
        <DialogContent>
          {header ? (
            <>{header}</>
          ) : (
            <>
              <DialogHeader>
                <div className='flex items-center justify-between gap-6'>
                  <DialogTitle>{title}</DialogTitle>
                  {showClose && (
                    <DialogClose>
                      <XIcon className='size-4' />
                    </DialogClose>
                  )}
                </div>
                {description && <DialogDescription>{description}</DialogDescription>}
              </DialogHeader>
              {children}
            </>
          )}
        </DialogContent>
      </>
    );
  }, [trigger, header, title, description, showClose]);

  return control ? (
    <Dialog open={control.isDialogOpen} onOpenChange={control.setIsDialogOpen}>
      {dialogContent}
    </Dialog>
  ) : (
    <Dialog>{dialogContent}</Dialog>
  );
};
