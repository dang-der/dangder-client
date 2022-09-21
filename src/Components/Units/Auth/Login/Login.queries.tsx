import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
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
        }
      }
    }
  }
`;
