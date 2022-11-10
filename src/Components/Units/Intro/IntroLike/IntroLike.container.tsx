import Link from "next/link";
import * as S from "./IntroLike.styles";
import Lottie from "lottie-react";
import ani_like from "../../../../../public/ani_like.json";

export default function IntroLike() {
  return (
    <S.Wrapper>
      <S.MainImageWrapper>
        <S.MainImage src="/intro3.png" />
        <Lottie className="haha" animationData={ani_like} loop={true} />
      </S.MainImageWrapper>
      <S.SubTitle>지금 당장 댕댕이와 만나보세요</S.SubTitle>

      <S.ButtonWrapper>
        <S.Button>
          <Link href="/">다음</Link>
        </S.Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
