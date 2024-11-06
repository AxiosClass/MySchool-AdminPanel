import { gql } from '@apollo/client';
import { IClassRoom, IStaff } from '../types';

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

export interface IGetClassroomByClassIdArgs {
  classId: string;
}

export interface IGetClassroomByClassIdResponse {
  classrooms: {
    id: string;
    name: string;
    classTeacher: Pick<IStaff, 'name' | 'userId'>;
  }[];
}

export const GET_CLASSROOM_BY_CLASS_ID = gql`
  query GetClassroomsByClassId($classId: uuid!) {
    classrooms(
      where: { classId: { _eq: $classId } }
      order_by: { createdAt: desc }
    ) {
      id
      name
      classTeacher {
        name
        userId
      }
    }
  }
`;
