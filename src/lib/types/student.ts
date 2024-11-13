export interface IStudent {
  id: string;
  name: string;
  birthId: string;
  classroomId: string;
  class: string;
  bloodGroup: string;
  parents: { fatherName: string; motherName: string };
  guardian: { name: string; relation: string; phone: string };
  address: string;
  dob: Date;
  admittedAt: Date;
}
