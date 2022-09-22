import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./LandingPage.styles";

export default function Landing() {
  const router = useRouter();

  const onClickNonmember = () => {
    router.push("/");
  };

  return (
    <S.Wrapper>
      <S.LogoMainTitleWrapper>
        <S.LogoMainTitle src="/landing_logo.png" />
        <S.LogoSubTitle>
          친구를 발견하는 새로운 방법, 오늘도 댕더해
        </S.LogoSubTitle>
      </S.LogoMainTitleWrapper>

      <S.ButtonWrapper>
        <Link href="/auth/login">
          <S.Button>지금 시작</S.Button>
        </Link>
        <S.Nonmember onClick={onClickNonmember}>
          비회원으로 둘러보기
        </S.Nonmember>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
