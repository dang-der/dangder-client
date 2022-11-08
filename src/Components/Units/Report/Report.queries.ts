import { gql } from "@apollo/client";

export const CREATE_REPORT = gql`
  mutation createReport(
    $userId: String!
    $targetId: String!
    $reportContent: String!
  ) {
    createReport(
      userId: $userId
      targetId: $targetId
      reportContent: $reportContent
    ) {
      id
    }
  }
`;
