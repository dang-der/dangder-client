import { gql } from "@apollo/client";

export const FETCH_REPORTS = gql`
  query fetchReports($page: Float!) {
    fetchReports(page: $page) {
      email
      reportContent
    }
  }
`;
