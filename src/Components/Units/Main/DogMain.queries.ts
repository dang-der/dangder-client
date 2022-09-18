import { gql } from "@apollo/client";

export const FETCH_AROUND_DOG = gql`
  query fetchAroundDogs($id: String!, $page: Float!) {
    fetchAroundDogs(id: $id, page: $page) {
      id
      name
      age
      gender
      img {
        id
        img
      }
    }
  }
`;
