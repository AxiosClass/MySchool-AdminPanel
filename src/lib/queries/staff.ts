import { IStaff } from '@/lib/types';
import { gql } from '@apollo/client';

// type
export type TAddStaffWithUserAccount = Pick<
  IStaff,
  | 'id'
  | 'name'
  | 'nid'
  | 'phone'
  | 'dob'
  | 'bloodGroup'
  | 'salary'
  | 'designation'
  | 'address'
  | 'role'
> & { education: string; password: string };

export interface IAddStaffResponse {
  insert_staffs_one: { id: string };
  insert_users_one?: { id: string };
}

export const ADD_STAFF_WITH_USER_ACCOUNT = gql`
  mutation CreateStaffWithUserAccount(
    $id: String!
    $name: String!
    $nid: String!
    $phone: String!
    $dob: date!
    $bloodGroup: String!
    $salary: Int!
    $designation: String
    $address: String
    $education: json!
    $password: String!
    $role: user_roles_enum!
  ) {
    insert_staffs_one(
      object: {
        id: $id
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
      }
    ) {
      id
    }
    insert_users_one(
      object: { id: $id, name: $name, password: $password, role: $role }
    ) {
      id
    }
  }
`;

export type TAddStaffWithOutUserAccount = Pick<
  IStaff,
  | 'id'
  | 'name'
  | 'nid'
  | 'phone'
  | 'dob'
  | 'bloodGroup'
  | 'salary'
  | 'designation'
  | 'address'
> & { education: string };

export const ADD_STAFF_WITHOUT_USER_ACCOUNT = gql`
  mutation Staff(
    $id: String!
    $name: String!
    $nid: String!
    $phone: String!
    $dob: date!
    $bloodGroup: String!
    $salary: Int!
    $designation: String!
    $address: String!
    $education: json!
  ) {
    insert_staffs_one(
      object: {
        id: $id
        name: $name
        nid: $nid
        phone: $phone
        dob: $dob
        bloodGroup: $bloodGroup
        salary: $salary
        designation: $designation
        address: $address
        education: $education
        role: other
      }
    ) {
      id
    }
  }
`;

export interface IGetStaffsResponse {
  staffs: Pick<
    IStaff,
    | 'id'
    | 'name'
    | 'designation'
    | 'bloodGroup'
    | 'phone'
    | 'salary'
    | 'address'
    | 'role'
    | 'joinedAt'
  >[];
}

export const GET_STAFFS = gql`
  query GetStaff {
    staffs(order_by: { joinedAt: desc }) {
      id
      name
      designation
      bloodGroup
      phone
      salary
      address
      role
      joinedAt
    }
  }
`;
