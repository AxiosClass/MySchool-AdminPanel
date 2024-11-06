import { IStaff } from '@/lib/types';
import { gql } from '@apollo/client';

// type

export interface IAddStaffResponse {
  insert_staffs_one: { id: string };
}

export type TAddStaffWithUserAccount = Pick<
  IStaff,
  | 'name'
  | 'nid'
  | 'phone'
  | 'dob'
  | 'bloodGroup'
  | 'salary'
  | 'designation'
  | 'address'
  | 'education'
  | 'role'
  | 'userId'
> & { password: string };

export const ADD_STAFF_WITH_USER_ACCOUNT = gql`
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

export type TAddStaffWithOutUserAccount = Omit<
  TAddStaffWithUserAccount,
  'userId' | 'password' | 'role'
>;

export const ADD_STAFF_WITHOUT_USER_ACCOUNT = gql`
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

export interface IGetTEacherFormCreateClassroomResponse {
  staffs: Pick<IStaff, 'id' | 'name'>[];
}

export const GET_TEACHERS_FOR_CREATE_CLASSROOM = gql`
  query GetTeachersForCreateClassroom {
    staffs(where: { role: { _eq: teacher } }) {
      id
      name
    }
  }
`;
