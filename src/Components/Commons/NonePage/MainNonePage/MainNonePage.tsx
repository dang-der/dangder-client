import * as S from "./MainNonePage.styles";

interface TodayDogNonePageProps {
  dogImageUrl?: string;
}

export default function TodayDogNonePage({
  dogImageUrl,
}: TodayDogNonePageProps) {
  return (
    <S.Wrapper>
      <S.WaveOne />
      <S.WaveTwo />
      <S.DogImageWrapper src={dogImageUrl || "/pug.jpg"} />
      <span>현재 지역에서는 더이상 스와이프할 댕댕이가 없어요</span>
    </S.Wrapper>
  );
}
