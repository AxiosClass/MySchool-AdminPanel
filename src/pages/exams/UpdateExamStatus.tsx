import { QK } from '@/api';
import { updateExam } from '@/api/query';
import { CommonSelect } from '@/components/shared/form';
import { errorMessageGen } from '@/helpers';
import { EXAM_STATUS } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const UpdateExamStatus = ({ examId, status }: TUpdateExamStatusProps) => {
  const { mutate } = useMutation({ mutationFn: updateExam });
  const qc = useQueryClient();

  const handleUpdateExamStatus = (val: string) => {
    if (val === status) return;

    const id = toast.loading('Updating exam status...');
    mutate(
      { id: examId, payload: { status: val as EXAM_STATUS } },
      {
        onSuccess: (res) => {
          toast.success(res.message, { id });
          qc.invalidateQueries({ queryKey: [QK.EXAM] });
        },
        onError: (err) => toast.error(errorMessageGen(err), { id }),
      },
    );
  };

  return (
    <CommonSelect
      value={status}
      onChange={handleUpdateExamStatus}
      options={generateStatuses(status)}
      className='w-32'
    />
  );
};

const examStatus = [EXAM_STATUS.PENDING, EXAM_STATUS.ONGOING, EXAM_STATUS.COMPLETED];

const generateStatuses = (status: EXAM_STATUS) => {
  const index = examStatus.findIndex((st) => st === status);
  return examStatus.slice(index).map((st) => ({ label: st, value: st }));
};

type TUpdateExamStatusProps = { examId: string; status: EXAM_STATUS };
