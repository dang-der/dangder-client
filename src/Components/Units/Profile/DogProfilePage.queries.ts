import { gql } from "@apollo/client";

export const FETCH_LOGIN_USER = gql`
  query fetchLoginUser {
    fetchLoginUser {
      id
      email
      pet
    }
  }
`;

export const FETCH_MY_DOG = gql`
  query fetchMyDog($userId: String!) {
    fetchMyDog(userId: $userId) {
      id
      name
      age
      description
      img {
        img
      }
    }
  }
`;

export const FETCH_DOG_IMAGE = gql`
  query fetchDogImage($dogId: String!) {
    fetchDogImage(dogId: $dogId) {
      img
    }
  }
`;
