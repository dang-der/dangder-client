import Link from "next/link";
import * as S from "./DogProfilePage.styles";

// 댕댕이 프로필 api
const dogInfo = {
  name: "kkimi",
  age: 1,
  distance: 2,
  play: "공놀이가 좋은",
};

export default function DogProfilePageUI() {
  return (
    <S.Wrapper>
      <S.DogProfileWrapper>
        <S.DogProfile>
          <S.DogPhoto src="/dog1.jpg" />
          <S.DogInfo>
            <S.DogInfoHeader>
              <S.DogName>{dogInfo.name}</S.DogName>
              <S.DogAge>{dogInfo.age}</S.DogAge>
            </S.DogInfoHeader>
            <S.DogInfoBody>
              <S.DogDistance>{dogInfo.distance}km</S.DogDistance>
              <S.DogPlay>{dogInfo.play}</S.DogPlay>
            </S.DogInfoBody>
          </S.DogInfo>
        </S.DogProfile>
        <Link href="/profile/edit">
          <S.ProfileEditButton>수정</S.ProfileEditButton>
        </Link>
      </S.DogProfileWrapper>
      <S.DogMoneyWrapper>
        <S.DogMoneyHeader>
          <S.title>댕더 머니</S.title>
          <S.InfomationIcon />
        </S.DogMoneyHeader>
        <S.DogMoneyBody>
          <S.LeftArrowIcon />
          <S.Amount>0</S.Amount>KRW
        </S.DogMoneyBody>
        <Link href="/payments">
          <S.DogMoneyButton>충전</S.DogMoneyButton>
        </Link>
      </S.DogMoneyWrapper>
      <S.DogProfileSetting>
        <Link href="/settings">
          <S.SettingButton>설정</S.SettingButton>
        </Link>
        <S.RightArrowIcon />
      </S.DogProfileSetting>
    </S.Wrapper>
  );
}
