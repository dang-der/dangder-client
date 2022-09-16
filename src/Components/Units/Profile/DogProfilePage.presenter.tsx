import Link from "next/link";
import * as S from "./DogProfilePage.styles";

export default function DogProfilePageUI(props: any) {
  return (
    <S.Wrapper>
      <S.DogProfileWrapper>
        <S.DogProfile>
          {console.log(props.MyDogData)}
          <S.DogPhoto src={props.MyDogData?.img.img} />
          <S.DogInfo>
            <S.DogInfoHeader>
              <S.DogName>{props.MyDogData?.name}, </S.DogName>
              <S.DogAge>{props.MyDogData?.age}</S.DogAge>
            </S.DogInfoHeader>
            <S.DogInfoBody>
              <S.DogDescription>
                {props.MyDogData?.description}
              </S.DogDescription>
            </S.DogInfoBody>
          </S.DogInfo>
        </S.DogProfile>
        <S.ProfileEditButtonWrapper>
          <Link href="/profile/edit">
            <S.ProfileEditButton>수정</S.ProfileEditButton>
          </Link>
        </S.ProfileEditButtonWrapper>
      </S.DogProfileWrapper>
      <S.SettingWrapper>
        <Link href="/settings">
          <S.DogProfileSetting>
            <S.SettingSpan>설정</S.SettingSpan>
            <S.RightArrowIcon />
          </S.DogProfileSetting>
        </Link>
      </S.SettingWrapper>
    </S.Wrapper>
  );
}
