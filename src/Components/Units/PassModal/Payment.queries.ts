import { gql } from "@apollo/client";

export const CREATE_PAYMENT = gql`
  mutation createPayment($impUid: String!, $payMoney: Float!) {
    createPayment(impUid: $impUid, payMoney: $payMoney) {
      id
    }
  }
`;
