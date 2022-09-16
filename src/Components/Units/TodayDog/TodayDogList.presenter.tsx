import { useRouter } from "next/router";
import * as S from "./TodayDogList.styles";

export default function TodayDogListUI() {
  const router = useRouter();

  const onClickMoveDogDetail = () => {
    router.push("/dogId");
  };

  const onClickPass = () => {
    router.push("/chat");
  };

  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.ListImageWrapper onClick={onClickMoveDogDetail}>
          <S.GradientBox />
          {/* <S.ListImage src="/dog5.jpeg"></S.ListImage> */}
          {/* <S.ListImage src={pickDogData?.fetchOneDog?.img[0].img}></S.ListImage> */}
        </S.ListImageWrapper>
        <S.ListFunctionIconWrapper>
          <S.ListFunctionMoveChat onClick={onClickPass} src="/passIcon.png" />
        </S.ListFunctionIconWrapper>
        <S.ListInfo>
          <S.ListName>그릉이,</S.ListName>
          <S.ListAge>4</S.ListAge>
        </S.ListInfo>
        {/* <S.GradientBox /> */}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
