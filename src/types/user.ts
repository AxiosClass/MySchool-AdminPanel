export interface ILoggedUser {
  id: string;
  name: string;
  role: USER_ROLE;
  needPasswordChange: boolean;
}

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  TEACHER = 'teacher',
  STUDENT = 'student',
}
