import Link from "next/link";
import * as S from "./IntroChat.styles";

export default function IntroChat() {
  return (
    <S.Wrapper>
      <S.MainImageWrapper>
        <S.MainImage src="/intro2.png" />
      </S.MainImageWrapper>

      <S.ButtonWrapper>
        <S.SubTitle>
          가까운곳의 댕댕이와
          <br />
          약속을 잡아보세요
        </S.SubTitle>
        <Link href="/intro/introlike">
          <S.Button>다음</S.Button>
        </Link>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
