import * as S from "./TodayDogNonePage.styles";

export default function TodayDogNonePage() {
  return (
    <S.Wrapper>
      <S.WaveOne />
      <S.TodayPickImageWrapper src={"/todaypick.png"} />
      <span>좋아요를 많이 받은 오늘의 댕댕이를 기다려주세요</span>
    </S.Wrapper>
  );
}
