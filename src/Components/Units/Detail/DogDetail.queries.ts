import { gql } from "@apollo/client";

// export const FETCH_DOG_DISTANCE = gql`
//   query fetchDogsDistance($id: String!) {
//     fetchDogsDistance(id: $id) {
//       id
//       dogId
//       distance
//     }
//   }
// `;

export const FETCH_ONE_DOG = gql`
  query fetchOneDog($id: String!) {
    fetchOneDog(id: $id) {
      id
      name
      age
      gender
      isNeut
      description
      interests {
        id
        interest
      }
      avoidBreeds {
        id
        avoidBreed
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

export const JOIN_CHAT_ROOM = gql`
  mutation joinChatRoom($dogId: String!, $chatPairId: String!) {
    joinChatRoom(dogId: $dogId, chatPairId: $chatPairId) {
      id
      chatPairId
      dog {
        id
      }
    }
  }
`;

export const FETCH_LOGIN_USER = gql`
  query fetchLoginUser {
    fetchLoginUser {
      user {
        id
        email
        pet
      }
      dog {
        id
        name
        age
        gender
        description
        img {
          img
        }
      }
    }
  }
`;
