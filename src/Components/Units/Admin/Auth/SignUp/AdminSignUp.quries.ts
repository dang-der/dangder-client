import { gql } from "@apollo/client";

export const CREATE_ADMIN_USER = gql`
  mutation createAdminUser($account: String!, $password: String!) {
    createAdminUser(account: $account, password: $password) {
      id
      account
    }
  }
`;
