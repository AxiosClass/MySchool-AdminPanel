import { gql } from '@apollo/client';

export interface ILoginResponse {
  login_action: {
    accessToken: string;
  };
}

export interface ILoginPayload {
  userId: string;
  password: string;
}

export const LOGIN = gql`
  mutation Login($userId: String!, $password: String!) {
    login_action(userId: $userId, password: $password) {
      accessToken
    }
  }
`;
