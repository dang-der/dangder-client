import * as S from "./DogReportCause.styles";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import { ChangeEvent } from "react";

interface IDogReportCauseUIProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNextPage: () => void;
}
export default function DogReportCauseUI({
  onChange,
  handleNextPage,
}: IDogReportCauseUIProps) {
  return (
    <S.Wrapper>
      <S.ReportInfo>
        <S.ReportInfoTop>
          <S.ReportIcon>
            <ReportProblemRoundedIcon />
          </S.ReportIcon>
          <S.ReportTitle>신고 이유는 무엇인가요?</S.ReportTitle>
        </S.ReportInfoTop>
        <S.ReportInfoMid>
          <S.ReportContentInput
            onChange={onChange}
            placeholder="신고 사유를 작성해 주세요(신고 내용은 비공개로 처리됩니다.)"
          />
        </S.ReportInfoMid>
      </S.ReportInfo>
      <S.ReportContentSecret>
        폭군 님에게는 신고 사실이 공개되지 않습니다.
      </S.ReportContentSecret>
      <S.NextButton onClick={handleNextPage}>신고하기</S.NextButton>
    </S.Wrapper>
  );
}
