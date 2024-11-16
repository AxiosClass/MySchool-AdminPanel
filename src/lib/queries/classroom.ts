import { IClassroom } from '../types';
import { gql } from '@apollo/client';

export type TCreateClassroomPayload = Pick<
  IClassroom,
  'name' | 'classId' | 'teacherId'
>;

export interface ICreateClassroomResponse {
  insert_classrooms_one: {
    id: string;
  };
}

export const CREATE_CLASSROOM = gql`
  mutation CreateClass($name: String!, $teacherId: String!, $classId: uuid!) {
    insert_classrooms_one(
      object: { name: $name, teacherId: $teacherId, classId: $classId }
    ) {
      id
    }
  }
`;
