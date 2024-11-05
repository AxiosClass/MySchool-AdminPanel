import { gql } from '@apollo/client';
import { IClass } from '../types/class';

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

export interface IGetClassResponse {
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
