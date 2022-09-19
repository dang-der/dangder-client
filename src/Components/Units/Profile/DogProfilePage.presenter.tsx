import Link from "next/link";
import * as S from "./DogProfilePage.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IDog } from "../../../Commons/Types/Generated/types";

interface DogProfilePageUIProps {
  myDogData: IDog | undefined;
}

export default function DogProfilePageUI({ myDogData }: DogProfilePageUIProps) {
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
              {/* {
                myDogData?.img.map(()=>{

                })
              } */}
            </Slider>
          </S.DogProfileImageWrapper>
          <S.DogPhoto
            src={"https://storage.googleapis.com/" + myDogData?.img[0].img}
          />
          <S.DogInfo>
            <S.DogInfoHeader>
              <S.DogName>{myDogData?.name}, </S.DogName>
              <S.DogAge>{myDogData?.age}</S.DogAge>
            </S.DogInfoHeader>
            <S.DogInfoBody>
              <S.DogDescription>{myDogData?.description}</S.DogDescription>
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
