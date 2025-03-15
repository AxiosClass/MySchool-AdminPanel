export type TExam = { id: string; name: string; year: number; status: EXAM_STATUS; createdAt: Date };

export enum EXAM_STATUS {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}
