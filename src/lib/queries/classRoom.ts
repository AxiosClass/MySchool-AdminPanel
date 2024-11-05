import { gql } from '@apollo/client';
import { IClassRoom } from '../types';

export type TCreateClassroomPayload = Pick<
  IClassRoom,
  'name' | 'classId' | 'teacherId'
>;

export interface ICreateClassroomResponse {
  insert_classrooms_one: {
    id: string;
  };
}

export const CREATE_CLASSROOM = gql`
  mutation CreateClass($name: String!, $teacherId: uuid!, $classId: uuid!) {
    insert_classrooms_one(
      object: { name: $name, teacherId: $teacherId, classId: $classId }
    ) {
      id
    }
  }
`;
