import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
    }
  }
`;

export const CREATE_MAIL_TOKEN = gql`
  mutation createMailToken($email: String!, $type: String!) {
    createMailToken(email: $email, type: $type)
  }
`;

export const VERIFY_MAIL_TOKEN = gql`
  mutation verifyMailToken($email: String!, $code: String!) {
    verifyMailToken(email: $email, code: $code)
  }
`
