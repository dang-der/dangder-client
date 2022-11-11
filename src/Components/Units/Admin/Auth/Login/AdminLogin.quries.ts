import { gql } from "@apollo/client";

export const ADMIN_LOGIN = gql`
  mutation adminLogin($account: String!, $password: String!) {
    adminLogin(account: $account, password: $password)
  }
`;
