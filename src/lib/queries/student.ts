import { gql } from '@apollo/client';
import { IStudent } from '../types';

export type TAddStudentPayload = Pick<
  IStudent,
  | 'name'
  | 'birthId'
  | 'class'
  | 'classroomId'
  | 'bloodGroup'
  | 'dob'
  | 'address'
> & {
  parents: string;
  guardian: string;
};

export interface IAddStudentResponse {
  add_student: {
    ok: boolean;
    message: string;
  };
}

export const ADD_STUDENT = gql`
  mutation AddStudent(
    $name: String!
    $birthId: String!
    $class: String!
    $classroomId: uuid!
    $bloodGroup: String!
    $dob: date!
    $parents: String!
    $guardian: String!
    $address: String!
  ) {
    add_student(
      name: $name
      birthId: $birthId
      class: $class
      classroomId: $classroomId
      bloodGroup: $bloodGroup
      dob: $dob
      parents: $parents
      guardian: $guardian
      address: $address
    ) {
      message
      ok
    }
  }
`;

export interface IGetStudentsResponse {
  students: {
    id: string;
    name: string;
    class: string;
    classroom: {
      id: string;
      name: string;
    };
    admittedAt: string;
  }[];
}

export const GET_STUDENTS = gql`
  query GetStudents {
    students(order_by: { admittedAt: desc }) {
      id
      name
      class
      classroom {
        id
        name
      }
      admittedAt
    }
  }
`;
