import { gql } from "@apollo/client";

export const FETCH_AROUND_DOG = gql`
  query fetchAroundDogs($id: String!, $page: Float!) {
    fetchAroundDogs(id: $id, page: $page) {
      id
      name
      age
      description
      gender
      img {
        id
        img
        isMain
      }
    }
  }
`;

export const FETCH_DOGS_DISTANCE = gql`
  query fetchDogsDistance($id: String!) {
    fetchDogsDistance(id: $id) {
      dogId
      distance
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation createLike($createLikeInput: createLikeInput!) {
    createLike(createLikeInput: $createLikeInput) {
      isMatch
      sendId
      receiveId
    }
  }
`;

export const FETCH_LOGIN_USER_IS_CERT = gql`
  query fetchLoginUserIsCert {
    fetchLoginUserIsCert
  }
`;

export const FETCH_DOGS = gql`
  query fetchDogs($page: Float!) {
    fetchDogs(page: $page) {
      id
      name
      age
      gender
      description
      img {
        img
        isMain
      }
    }
  }
`;
