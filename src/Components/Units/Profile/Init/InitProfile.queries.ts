import { gql } from "@apollo/client";

export const GET_DOG_INFO = gql`
  mutation getdoginfo($registerNumber: String!, $birth: String!) {
    getdoginfo(registerNumber: $registerNumber, birth: $birth)
  }
`;
