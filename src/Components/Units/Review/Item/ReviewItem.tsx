import { IReview } from "../../../../Commons/Types/Generated/types";
import * as S from "./ReviewItem.style";

interface IReviewItemProps {
  review: IReview;
}
export default function ReviewItem({ review }: IReviewItemProps) {
  return (
    <>
      <S.Wrapper>
        <S.ReviewerInfoWrapper>
          <img
            src={`https://storage.googleapis.com/${
              review.sendReview.img.filter((e) => e.isMain)[0].img
            }`}
          />
          <span>{review.sendReview.name}</span>
        </S.ReviewerInfoWrapper>

        <S.ContentsWrapper>
          <S.TagWrapper>
            {review.reviewDetail.map((e) => (
              <S.Tag key={e.id}>{e.reviewDetail}</S.Tag>
            ))}
          </S.TagWrapper>

          <S.MessageWrapper>{review.reviewMessage}</S.MessageWrapper>
        </S.ContentsWrapper>
      </S.Wrapper>
      <S.Line />
    </>
  );
}
