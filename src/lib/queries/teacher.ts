import { gql } from '@apollo/client';
import { ITeacher } from '../types';

export type TAddTeacherPayload = Pick<
  ITeacher,
  'id' | 'name' | 'nid' | 'phone' | 'dob' | 'bloodGroup' | 'salary' | 'address'
> & { education: string; password: string };

export interface IAddTeacherResponse {
  insert_teachers_one: { id: string };
  insert_users_one: { id: string };
}

export const ADD_TEACHER = gql`
  mutation AddTeacher(
    $id: String!
    $name: String!
    $nid: String!
    $phone: String!
    $dob: date!
    $bloodGroup: String!
    $salary: Int!
    $address: String
    $education: json!
    $password: String!
  ) {
    insert_teachers_one(
      object: {
        id: $id
        name: $name
        nid: $nid
        phone: $phone
        dob: $dob
        bloodGroup: $bloodGroup
        salary: $salary
        address: $address
        education: $education
      }
    ) {
      id
    }
    insert_users_one(
      object: { id: $id, password: $password, role: teacher, name: $name }
    ) {
      id
    }
  }
`;
