export type TMeta = { page: number; limit: number; total: number; totalPages: number };
export type TServerResponse<TData> = { ok: boolean; message: string; data: TData; meta?: TMeta };
export type TPromiseResponse<TData> = Promise<TServerResponse<TData>>;

export enum PAYMENT_TYPES {
  ADMISSION_FEE = 'ADMISSION_FEE',
  MONTHLY_FEE = 'MONTHLY_FEE',
  OTHERS = 'OTHERS',
}
