import { gql } from '@apollo/client';

export interface ILoginResponse {
  login_action: {
    accessToken: string;
  };
}

export interface ILoginPayload {
  id: string;
  password: string;
}

export const LOGIN = gql`
  mutation Login($id: String!, $password: String!) {
    login_action(id: $id, password: $password) {
      accessToken
    }
  }
`;
