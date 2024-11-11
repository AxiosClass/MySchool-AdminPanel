import { IClass, IClassroom, ITeacher } from '../types';
import { gql } from '@apollo/client';

export type TCreateClassPayload = Pick<IClass, 'name' | 'level'>;

export interface ICreateClassResponse {
  insert_classes_one: { id: string };
}

export const CREATE_CLASS = gql`
  mutation CreateClass($name: String!, $level: String!) {
    insert_classes_one(object: { name: $name, level: $level }) {
      id
    }
  }
`;

export interface IGetClassesResponse {
  classes: IClass[];
}

export const GET_CLASSES = gql`
  query GetClasses {
    classes(order_by: { level: asc }) {
      id
      name
      level
    }
  }
`;

export interface IGetClassByIdArgs {
  id: string;
}

export interface IGetClassByIdResponse {
  classes_by_pk: Pick<IClass, 'id' | 'level' | 'name'> & {
    classrooms: (Pick<IClassroom, 'id' | 'name'> & {
      classTeacher: Pick<ITeacher, 'id' | 'name'>;
    })[];
  };
}

export const GET_CLASS_BY_ID = gql`
  query GetClassById($id: uuid!) {
    classes_by_pk(id: $id) {
      id
      level
      name
      classrooms {
        id
        name
        classTeacher {
          id
          name
        }
      }
    }
  }
`;
