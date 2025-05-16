// Common

export type TObject<TValue = string> = Record<string, TValue>;
export type TMeta = { page: number; limit: number; total: number; totalPages: number };
export type TServerResponse<TData> = { ok: boolean; message: string; data: TData; meta?: TMeta };
export type TPromiseResponse<TData = null> = Promise<TServerResponse<TData>>;

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

// User
export type TLoggedUser = {
  id: string;
  name: string;
  role: USER_ROLE;
  needPasswordChange: boolean;
};

// Admin Types
export type TAdmin = {
  id: string;
  name: string;
  status: USER_STATUS;
  role: USER_ROLE;
};

// Student
export type TStudent = {
  id: string;
  password: string;
  name: string;
  birthId: string;
  dob: Date;
  bloodGroup: string;
  address: string;
  parents: { fatherName: string; motherName: string };
  guardian: { name: string; phone: string; relation: string };
  admittedAt: Date;
  updatedAt: Date;
  class: string;
  classroomId: string;
  monthlyFee: number | null;
  cardId?: string;
};

// Teacher
export type TTeacher = {
  id: string;
  name: string;
  nid: string;
  phone: string;
  dob: Date | string;
  bloodGroup: string;
  salary: number;
  address: string;
  education: TTeacherEducation;
};

export type TTeacherEducation = {
  degree: string;
  passedYear: string;
};

// Payment
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

// Class
export type TClass = {
  id: string;
  name: string;
  level: string;
  monthlyFee: number;
  admissionFee: number;
  createdAt: Date;
};

// Classroom
export type TClassroom = {
  id: string;
  name: string;
  createdAt: Date;
  classId: string;
  classTeacherId: string;
};

// Exam
export type TExam = {
  id: string;
  name: string;
  year: number;
  status: EXAM_STATUS;
  percentile: number;
  createdAt: Date;
};

export enum EXAM_STATUS {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}

// Holiday
export type THoliday = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

// Notice
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
