export enum USER_ROLES {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: USER_ROLES;
  profileImage?: string;
};
