import { EUserRole } from '@/lib/types/user';
import { gql } from '@apollo/client';

export interface IAddTeacherPayload {
  name: string;
  nid: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  salary: number;
  designation: string;
  address: string;
  education: string;
  role: EUserRole;
  userId: string;
  password: string;
}

export interface IAddTeacherResponse {
  insert_staffs_one: { id: string };
}

export const ADD_TEACHER = gql`
  mutation Staff(
    $name: String!
    $nid: String!
    $phone: String!
    $dob: date!
    $bloodGroup: String!
    $salary: Int!
    $designation: String!
    $address: String!
    $education: json!
    $role: user_roles_enum!
    $userId: String!
    $password: String!
  ) {
    insert_staffs_one(
      object: {
        name: $name
        nid: $nid
        phone: $phone
        dob: $dob
        bloodGroup: $bloodGroup
        salary: $salary
        designation: $designation
        address: $address
        education: $education
        role: $role
        userInfo: {
          data: {
            name: $name
            role: $role
            userId: $userId
            password: $password
          }
        }
      }
    ) {
      id
    }
  }
`;
