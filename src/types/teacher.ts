export interface ITeacher {
  id: string;
  name: string;
  nid: string;
  phone: string;
  dob: Date;
  bloodGroup: string;
  salary: number;
  address: string;
  education: {
    degreeName: string;
    group: string;
    result: string;
  };
  joinedAt: Date;
}
