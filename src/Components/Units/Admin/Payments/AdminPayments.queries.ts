import { gql } from "@apollo/client";

export const FETCH_PAYMENTS = gql`
  query fetchPayments($page: Float!) {
    fetchPayments(page: $page) {
      email
      payMoney
      paymentType
      createdAt
    }
  }
`;
