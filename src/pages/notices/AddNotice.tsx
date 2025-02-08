import { QK } from '@/api';
import { FormDialog } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { NoticeForm, TNoticeForm } from './notice-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNotice } from '@/api/query/noticeQuery';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helpers';
import { NOTICE_FOR } from '@/types';

export const AddNotice = () => {
  const { open, onOpenChange } = usePopupState();
  const formId = QK.NOTICE + '_ADD';
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addNotice,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.NOTICE] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddNotice = (formData: TNoticeForm) => {
    mutate({ ...formData, noticeFor: formData.noticeFor as NOTICE_FOR });
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Add Notice' onClick={() => onOpenChange(true)} />
      <FormDialog
        title='Add Notice'
        description='Please fill all the fields'
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <NoticeForm formId={formId} onSubmit={handleAddNotice} />
      </FormDialog>
    </>
  );
};
