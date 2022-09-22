import Link from "next/link";
import * as S from "./IntroSearch.styles";
import Lottie from "lottie-react";
import ani_searching from "../../../../../public/ani_searching.json";

export default function Intro() {
  return (
    <S.Wrapper>
      <S.MainImageWrapper>
        <S.MainImage src="/intro1.png" />
        <Lottie animationData={ani_searching} loop={true} />
      </S.MainImageWrapper>
      <S.SubTitle>댕댕이의 친구를 찾아주세요</S.SubTitle>

      <S.ButtonWrapper>
        <Link href="/intro/introchat">
          <S.Button>다음</S.Button>
        </Link>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
