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
};
