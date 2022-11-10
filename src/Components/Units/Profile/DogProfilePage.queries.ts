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

export const UPDATE_DOG = gql`
  mutation updateDog($dogId: String!, $updateDogInput: UpdateDogInput!) {
    updateDog(dogId: $dogId, updateDogInput: $updateDogInput) {
      id
    }
  }
`;

export const FETCH_LOGIN_USER_IS_CERT = gql`
  query fetchLoginUserIsCert {
    fetchLoginUserIsCert
  }
`;

export const FETCH_PASS_TICKET = gql`
  query fetchPassTicket($email: String!) {
    fetchPassTicket(email: $email) {
      createdAt
      expiredAt
    }
  }
`;
