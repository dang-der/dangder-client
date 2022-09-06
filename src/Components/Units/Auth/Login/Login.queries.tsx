import { gql } from "@apollo/client";

  export const USER_LOGIN = gql`
    mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
    }
  `

  export const FETCH_LOGIN_USER = gql`
  query fetchLoginUser {
    fetchLoginUser {
    id
    email
    password
    pet
    ddMoney
    phone
    }
  }
`