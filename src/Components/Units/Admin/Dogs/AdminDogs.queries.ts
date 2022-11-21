import { gql } from "@apollo/client";

export const FETCH_DOGS = gql`
  query fetchDogs($page: Float!) {
    fetchDogs(page: $page) {
      id
      name
      age
      gender
      user {
        id
        email
      }
    }
  }
`;

export const FETCH_DOGS_BY_SEARCH = gql`
  query fetchDogsBySearch($search: String) {
    fetchDogsBySearch(search: $search) {
      id
      name
      email
    }
  }
`;
