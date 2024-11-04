import { gql } from '@apollo/client';

export interface ICreateClassArgs {
  name: string;
  level: string;
}

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
