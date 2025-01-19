export type TMeta = { page: number; limit: number; total: number; totalPages: number };
export type TServerResponse<IData> = { ok: boolean; message: string; data: IData; meta?: TMeta };

export enum PAYMENT_TYPES {
  ADMISSION_FEE = 'ADMISSION_FEE',
  MONTHLY_FEE = 'MONTHLY_FEE',
  OTHERS = 'OTHERS',
}
