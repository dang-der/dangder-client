import { gql } from "@apollo/client";

export const FETCH_BLOCK_USERS = gql`
  query fetchBlockUsers($page: Float!) {
    fetchBlockUsers(page: $page) {
      email
      blockId
    }
  }
`;
