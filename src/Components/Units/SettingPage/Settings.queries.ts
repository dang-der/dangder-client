import { gql } from "@apollo/client";

export const USER_LOG_OUT = gql`
  mutation userLogout {
    userLogout
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($email: String!) {
    deleteUser(email: $email)
  }
`;

export const FETCH_USER = gql`
  query fetchUser($email: String!) {
    fetchUser(email: $email) {
      id
      email
    }
  }
`;

export const FETCH_LOGIN_USER = gql`
  query fetchLoginUser {
    fetchLoginUser {
      id
      email
      pet
      dog {
        id
        name
        age
        gender
        # img {
        #   id
        #   # img
        # }
      }
    }
  }
`;
