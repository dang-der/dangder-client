import { gql } from "@apollo/client";

export const FETCH_TODAY_DOG = gql`
  query fetchTodayDog {
    fetchTodayDog {
      id
      mainImg
      name
      age
    }
  }
`;

export const FETCH_CHAT_ROOMS = gql`
  query fetchChatRooms($dogId: String!) {
    fetchChatRooms(dogId: $dogId) {
      id
      chatPairDog {
        id
        name
      }
      dog {
        id
        name
      }
      lastMessage {
        senderId
        type
        message
      }
    }
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

export const FETCH_LOGIN_USER_IS_CERT = gql`
  query fetchLoginUserIsCert {
    fetchLoginUserIsCert
  }
`;

// export const FETCH_USER = gql`
//   query fetchUser($email: String!) {
//     fetchUser(email: $email) {
//       id
//       email
//     }
//   }
// `;

// export const FETCH_LOGIN_USER = gql`
//   query fetchLoginUser {
//     fetchLoginUser {
//       id
//       email
//       pet
//       dog {
//         id
//         name
//         age
//         gender
//         # img {
//         #   id
//         #   # img
//         # }
//       }
//     }
//   }
// `;
