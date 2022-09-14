import * as S from "./TodayDogList.styles";

export default function TodayDogListUI() {
  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.ListImageWrapper>
          <S.ListImage src={"/dog5.jpeg"}></S.ListImage>
        </S.ListImageWrapper>
        <S.ListFunctionIconWrapper>
          <S.ListFunctionMoveChat src="/passIcon.png" />
        </S.ListFunctionIconWrapper>
        <S.ListInfor>
          <S.ListName>그릉이,</S.ListName>
          <S.ListAge>4</S.ListAge>
        </S.ListInfor>
      </S.ListWrapper>
      <S.ListWrapper>
        <S.ListImageWrapper>
          <S.ListImage src={"/dog3.jpeg"}></S.ListImage>
        </S.ListImageWrapper>
        <S.ListFunctionIconWrapper>
          <S.ListFunctionMoveChat src="/passIcon.png" />
        </S.ListFunctionIconWrapper>
        <S.ListInfor>
          <S.ListName>절미,</S.ListName>
          <S.ListAge>3</S.ListAge>
        </S.ListInfor>
      </S.ListWrapper>
    </S.Wrapper>
  );
}
