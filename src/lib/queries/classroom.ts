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

export interface IGetClassroomByClassLevelArgs {
  level: string;
}

export interface IGetClassroomByClassLevelResponse {
  classrooms: Pick<IClassroom, 'id' | 'name'>[];
}

export const GET_CLASSROOM_BY_CLASS_LEVEL = gql`
  query GetClassroomsByClassLevel($level: String!) {
    classrooms(where: { class: { level: { _eq: $level } } }) {
      id
      name
    }
  }
`;
