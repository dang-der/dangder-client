import { IReview } from "../../../../Commons/Types/Generated/types";
import * as S from "./ReviewItem.style";

interface IReviewItemProps {
  review: IReview | any;
}
export default function ReviewItem({ review }: IReviewItemProps) {
  return (
    <>
      <S.Wrapper>
        <S.ReviewerInfoWrapper>
          <img />
          <span>name</span>
        </S.ReviewerInfoWrapper>

        <S.ContentsWrapper>
          <S.TagWrapper>{}</S.TagWrapper>

          <S.MessageWrapper>
            dsjflkasjdlfkjas;ldjflaksjdfl;kasjdf;lkajsd;lfkj
          </S.MessageWrapper>
        </S.ContentsWrapper>
      </S.Wrapper>
      <S.Line />
    </>
  );
}
