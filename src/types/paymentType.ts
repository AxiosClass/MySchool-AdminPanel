export type TPayment = {
  id: string;
  amount: number;
  month: number | null;
  year: number;
  createdAt: Date;
  description: string | null;
  type: PAYMENT_TYPE;
  studentId: string;
};

export enum PAYMENT_TYPE {
  ADMISSION_FEE = 'ADMISSION_FEE',
  MONTHLY_FEE = 'MONTHLY_FEE',
  OTHERS = 'OTHERS',
}
