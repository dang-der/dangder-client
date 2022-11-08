import { gql } from "@apollo/client";

// export const FETCH_INTEREST_CATEGORY = gql`
//   query fetchInterestCategory {
//     fetchInterestCategory {
//       interest
//       interestImg
//       title
//       subTitle
//     }
//   }
// `;

export const FETCH_INTEREST_CATEGORY = gql`
  query fetchInterestCategory {
    fetchInterestCategory {
      interest
      interestImg
      title
      subTitle
    }
  }
`;

// export const FETCH_CATEGORY_DOGS = gql`
//   query fetchCategoryDogs($interest: String!) {
//     fetchCategoryDogs(interest: $interest) {
//       id
//       name
//       age
//       gender
//       interest {
//         id
//         interest
//         interestImg
//         title
//         subTitle
//         fetchDogs
//         iChatRoom
//       }
//       description
//       user
//       img {
//         img
//         isMain
//       }
//     }
//   }
// `;

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
      interests {
        id
        interest
        title
      }
      img {
        img
        isMain
      }
    }
  }
`;
