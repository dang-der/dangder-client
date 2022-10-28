import { useRouter } from "next/router";
import ReviewItem from "../Item/ReviewItem";
import * as S from "./ReceivedReviewList.style";

export default function ReceivedReviewListContainer() {
  const router = useRouter();

  return (
    <S.ReviewsWrapper>
      {[
        { reviewDetail: "ddd", reviewMessage: "sdfasdf" },
        { reviewDetail: "ddd", reviewMessage: "sdfasdf" },
        { reviewDetail: "ddd", reviewMessage: "sdfasdf" },
        { reviewDetail: "ddd", reviewMessage: "sdfasdf" },
        { reviewDetail: "ddd", reviewMessage: "sdfasdf" },
      ].map((e) => (
        <ReviewItem key={e.id} review={e} />
      ))}
    </S.ReviewsWrapper>
  );
}
