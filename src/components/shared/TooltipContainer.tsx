import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const TooltipContainer = ({ children, label }: TTooltipContainerProps) => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

// types
type TTooltipContainerProps = {
  children: ReactNode;
  label: string;
};
