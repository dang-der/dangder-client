import { gql } from "@apollo/client";

export const CREATE_PAYMENT = gql`
  mutation createPaymentForPassTicket($impUid: String!, $payMoney: Float!) {
    createPaymentForPassTicket(impUid: $impUid, payMoney: $payMoney) {
      id
    }
  }
`;
