import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export const CommonFormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
  children,
  showMessage = true,
  className,
  ...props
}: TCommonFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={(fieldProps) => (
        <FormItem className={className?.formItem}>
          {label && <FormLabel className='font-semibold'>{label}</FormLabel>}
          <FormControl>{children(fieldProps)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

type TCommonFormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  'render'
> & {
  label?: string;
  description?: string;
  showMessage?: boolean;
  children: ControllerProps<TFieldValues, TName>['render'];
  className?: { formItem?: string };
};
