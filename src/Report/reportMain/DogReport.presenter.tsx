import * as S from "./DogReport.styles";

export default function DogReportUI(props: any) {
  return (
    <S.Wrapper>
      <S.ReportInfo>
        <S.ReportInfoTop>
        <S.ReportIcon></S.ReportIcon>
        <S.ReportTitle>폭군 님 신고하기</S.ReportTitle>
        </S.ReportInfoTop>
        <S.ReportInfoMid> 
        <S.ReportContentClosedIcon></S.ReportContentClosedIcon>
        <S.ReportContentClosed>
          댕더는 여러분의 안전을 위하여 신고 내용을 비공개로 처리됩니다.
        </S.ReportContentClosed>
        </S.ReportInfoMid>
        <S.ReportInfoMid>
        <S.ReportContentRescueIcon></S.ReportContentRescueIcon>
        <S.ReportContentRescue>
          지금 당장 위험에 처한 경우 구조대에 연락하세요
        </S.ReportContentRescue>
        </S.ReportInfoMid>
      </S.ReportInfo>
      <S.NextButton onClick={props.onClickNextPage}>
        다음
      </S.NextButton>
    </S.Wrapper>
  );
}
