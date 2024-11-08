import { EUserRole } from './user';

export interface IStaff {
  id: string;
  name: string;
  nid: string;
  phone: string;
  dob: Date;
  bloodGroup: string;
  salary: number;
  designation: string;
  address: string;
  education: string;
  joinedAt: Date;
  role: EUserRole;
}
