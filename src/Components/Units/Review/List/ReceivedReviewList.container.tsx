import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchReceiveReviewsArgs,
} from "../../../../Commons/Types/Generated/types";
import ReviewItem from "../Item/ReviewItem";
import { FETCH_RECEIVE_REVIEWS } from "../Review.queries";
import * as S from "./ReceivedReviewList.style";

export default function ReceivedReviewListContainer() {
  const router = useRouter();

  const { data: reviews } = useQuery<
    Pick<IQuery, "fetchReceiveReviews">,
    IQueryFetchReceiveReviewsArgs
  >(FETCH_RECEIVE_REVIEWS, { variables: { id: String(router.query.dogId) } });

  return (
    <S.Wrapper>
      {(reviews?.fetchReceiveReviews?.length || 0) <= 0 ? (
        <S.EmptyText>아직 받은 매칭 후기가 없어요!</S.EmptyText>
      ) : (
        <S.ReviewsWrapper>
          {reviews?.fetchReceiveReviews.map((e) => (
            <ReviewItem key={e.id} review={e} />
          ))}
        </S.ReviewsWrapper>
      )}
    </S.Wrapper>
  );
}
