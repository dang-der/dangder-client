import * as S from "./DogReportSuccess.styles";

export default function DogReportSuccessUI(props: any) {
  return (
    <S.Wrapper>
      <S.ReportInfo>
        <S.ReportInfoTop>
        <S.ReportIcon></S.ReportIcon>
        <S.ReportTitle>신고가 정상 접수 되었습니다.</S.ReportTitle>
        </S.ReportInfoTop>
      </S.ReportInfo>
      <S.NextButton onClick={props.onClickrMainPage}>
        완료
      </S.NextButton>
    </S.Wrapper>
  );
}
