import Link from "next/link";
import * as S from "./DogProfilePage.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DogProfilePageUI(props: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <S.Wrapper>
      <S.DogProfileWrapper>
        <S.DogProfile>
          <S.DogProfileImageWrapper>
            <Slider
              dots={settings.dots}
              infinite={settings.infinite}
              speed={settings.speed}
              slidesToShow={settings.slidesToShow}
              slidesToScroll={settings.slidesToScroll}
            >
              <S.DogPhoto src={props.MyDogImage?.img[0].img}></S.DogPhoto>
              <S.DogPhoto src={props.MyDogImage?.img[0].img}></S.DogPhoto>
              <S.DogPhoto src={props.MyDogImage?.img[0].img}></S.DogPhoto>
            </Slider>
          </S.DogProfileImageWrapper>
          <S.DogPhoto src={props.MyDogImage} />
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
