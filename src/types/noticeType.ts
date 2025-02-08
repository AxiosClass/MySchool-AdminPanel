export type TNotice = {
  id: string;
  title: string;
  description: string;
  noticeFor: NOTICE_FOR;
  createdAt: string | Date;
};

export enum NOTICE_FOR {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ALL = 'ALL',
}
