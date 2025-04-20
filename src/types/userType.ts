export type TLoggedUser = {
  id: string;
  name: string;
  role: USER_ROLE;
  needPasswordChange: boolean;
};

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export enum USER_STATUS {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}
