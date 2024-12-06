import { XIcon } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

interface IProps {
  header?: ReactNode;
  title?: string;
  description?: string;
  asChild?: boolean;
  trigger: ReactNode;
  control?: { isSheetOpen: boolean; setIsSheetOpen: Dispatch<SetStateAction<boolean>> };
  children: ReactNode;
  showClose?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: { content?: string; header?: string };
}

export function CustomSheet({
  title,
  description,
  asChild,
  trigger,
  control,
  header,
  children,
  showClose,
  side = 'left',
  className,
}: IProps) {
  const sheetContent = useMemo(() => {
    return (
      <>
        <SheetTrigger asChild={asChild}>{trigger}</SheetTrigger>
        <SheetContent side={side} className={className?.content}>
          {header ? (
            header
          ) : (
            <SheetHeader className={className?.header}>
              <div>
                <SheetTitle>{title}</SheetTitle>
                {showClose && (
                  <SheetClose>
                    <XIcon className='size-4' />
                  </SheetClose>
                )}
              </div>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
          )}
          {children}
        </SheetContent>
      </>
    );
  }, [title, description, asChild, trigger, control, header, children, showClose, side]);

  return control ? (
    <Sheet open={control.isSheetOpen} onOpenChange={control.setIsSheetOpen}>
      {sheetContent}
    </Sheet>
  ) : (
    <Sheet>{sheetContent}</Sheet>
  );
}
