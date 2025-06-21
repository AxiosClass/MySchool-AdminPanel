import { PAYMENT_TYPE } from '@/lib/types';
import { cn } from '@/lib/utils';

export const PaymentTypeBadge = ({ type }: { type: PAYMENT_TYPE }) => {
  const config = PAYMENT_TYPE_CONFIG[type];

  return (
    <span
      className={cn('inline-block w-32 rounded p-2 text-center text-xs font-semibold text-white', config.className)}
    >
      {type}
    </span>
  );
};

const PAYMENT_TYPE_CONFIG = {
  [PAYMENT_TYPE.ADMISSION_FEE]: { className: 'bg-orange-600' },
  [PAYMENT_TYPE.MONTHLY_FEE]: { className: 'bg-blue-600' },
  [PAYMENT_TYPE.TERM_FEE]: { className: 'bg-yellow-600' },
  [PAYMENT_TYPE.OTHERS]: { className: 'bg-green-600' },
};
