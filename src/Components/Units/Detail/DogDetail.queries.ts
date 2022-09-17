import { gql } from "@apollo/client";

export const FETCH_DOG_DISTANCE = gql`
  query fetchDogsDistance($id: String!) {
    fetchDogsDistance(id: $id) {
      id
      dogId
      distance
    }
  }
`;

export const FETCH_ONE_DOG = gql`
  query fetchOneDog($id: String!) {
    fetchOneDog(id: $id) {
      id
      name
      age
      gender
      description
      interests {
        id
        interest
      }
      avoidBreeds {
        avoidBreed
        dogs {
          id
          name
        }
      }
      characters {
        id
        character
      }
      img {
        id
        img
        isMain
      }
      #   sendId {
      #     id
      #     receiveId
      #     sendId
      #   }
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation createLike($createLikeInput: createLikeInput!) {
    createLike(createLikeInput: $createLikeInput) {
      id
      receiveId
      isMatch
      sendId
    }
  }
`;
