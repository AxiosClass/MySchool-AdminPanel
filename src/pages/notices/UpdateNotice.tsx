import { QK } from '@/api';
import { toast } from 'sonner';
import { updateNotice } from '@/api/query';
import { usePopupState } from '@/hooks';
import { errorMessageGen } from '@/helpers';
import { NOTICE_FOR, TNotice } from '@/types';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoticeForm, TNoticeForm } from './NoticeForm';
import { FormDialog } from '@/components/shared/form';
import { PencilLineIcon } from 'lucide-react';

export const UpdateNotice = (payload: TNotice) => {
  const { id, createdAt: _, ...defaultValues } = payload;
  const formId = `${QK.NOTICE}_UPDATE_${id}`;

  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateNotice,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.NOTICE] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleUpdateNotice = (formData: TNoticeForm) => {
    mutate({ id, ...formData, noticeFor: formData.noticeFor as NOTICE_FOR });
  };

  return (
    <>
      <Button onClick={() => onOpenChange(true)} size='icon'>
        <PencilLineIcon className='size-4' />
      </Button>
      <FormDialog
        title='Update Notice'
        description='Please fill all the fields'
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle='Update'
        submitLoadingTitle='Updating...'
      >
        <NoticeForm formId={formId} onSubmit={handleUpdateNotice} defaultValues={defaultValues} />
      </FormDialog>
    </>
  );
};
