import * as S from "./DogReportCause.styles";

export default function DogReportCauseUI(props: any) {
  return (
    <S.Wrapper>
      <S.ReportInfo>
        <S.ReportInfoTop>
        <S.ReportIcon></S.ReportIcon>
        <S.ReportTitle>신고 이유는 무엇인가요?</S.ReportTitle>
        </S.ReportInfoTop>
        <S.ReportInfoMid> 
        <S.ReportContentInput
          onChange={props.onChangeComment}
          placeholder="신고 사유를 작성해 주세요(신고 내용은 비공개로 처리됩니다.)"/>
        </S.ReportInfoMid>
      </S.ReportInfo>
      <S.ReportContentSecret>
          폭군 님에게는 신고 사실이 공개되지 않습니다.
      </S.ReportContentSecret>
      <S.NextButton isActive={props.isActive}>
        다음
      </S.NextButton>
    </S.Wrapper>
  );
}
