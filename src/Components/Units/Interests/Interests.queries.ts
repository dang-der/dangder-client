import { gql } from "@apollo/client";

export const FETCH_INTERESTS = gql`
  query fetchInterests {
    fetchInterests {
      id
      fetchInterest
      dogs
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
