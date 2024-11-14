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
