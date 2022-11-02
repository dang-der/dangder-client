import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { reviewInputState } from "../../../../Commons/Store/Review/Review";
import { IDog, IQuery } from "../../../../Commons/Types/Generated/types";
import LargeButton from "../../../Commons/Button/LargeButton";
import * as S from "./ReviewWrite.style";

interface IReviewWriteUIProps {
  receiver: IDog;
  details: Pick<IQuery, "fetchReviewDetails"> | undefined;
  handleCreateReview: () => void;
}
export default function ReviewWriteUI({
  receiver,
  details,
  handleCreateReview,
}: IReviewWriteUIProps) {
  const [inputs, setInputs] = useRecoilState(reviewInputState);

  const onClickDetail = (detail: string) => () => {
    setInputs((p) => {
      const copy = [...p.details];
      inputs.details.includes(detail)
        ? copy.splice(copy.indexOf(detail), 1)
        : copy.push(detail);

      return { ...p, details: copy };
    });
  };

  const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs((p) => {
      return { ...p, message: e.target.value };
    });
  };

  const onClickReview = () => {
    handleCreateReview();
  };

  return (
    <S.Wrapper>
      <S.SubTitleWrapper>
        {receiver.name}님과의 만남이 어떠셨나요?
      </S.SubTitleWrapper>
      <S.DetailsWrapper>
        {details?.fetchReviewDetails.map((e, i) => (
          <S.Detail
            key={i}
            isSelected={inputs.details.includes(e.reviewDetail)}
            onClick={onClickDetail(e.reviewDetail)}
          >
            {e.reviewDetail}
          </S.Detail>
        ))}
      </S.DetailsWrapper>
      <S.SubTitleWrapper>리뷰를 남겨보세요!</S.SubTitleWrapper>
      <S.ReviewTextField onChange={onChangeReview} />
      <LargeButton
        title="리뷰 남기기"
        onClick={onClickReview}
        style={{ marginTop: "5rem", width: "100%" }}
      />
    </S.Wrapper>
  );
}
