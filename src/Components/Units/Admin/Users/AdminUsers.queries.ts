import { gql } from "@apollo/client";

export const FETCH_USERS = gql`
  query fetchUsers($page: Float!) {
    fetchUsers(page: $page) {
      id
      email
      pet
      createdAt
      reportCnt
    }
  }
`;

export const FETCH_USERS_BY_SEARCH = gql`
  query fetchUsersBySearch($search: String) {
    fetchUsersBySearch(search: $search) {
      email
    }
  }
`;
