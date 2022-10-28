import { gql } from "@apollo/client";

export const FETCH_REVIEW_DETAILS = gql`
  query fetchReviewDetails {
    fetchReviewDetails {
      id
      reviewDetail
    }
  }
`;

export const FETCH_RECEIVE_REVIEWS = gql`
  query fetchReceiveReviews($id: String!) {
    fetchReceiveReviews(id: $id) {
      reviewMessage
      # reviewDetail {
      #   reviewDetail
      # }
      sendReview {
        name
        img {
          img
          isMain
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($createReviewInput: CreateReviewInput!) {
    createReview(createReviewInput: $createReviewInput) {
      id
    }
  }
`;

export const IS_REVIEW_WRITED = gql`
  query fetchReviews($myId: String!, $targetId: String!) {
    fetchReviews(myId: $myId, targetId: $targetId)
  }
`;
