import Link from "next/link";
import * as S from "./DogProfilePage.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IDog } from "../../../Commons/Types/Generated/types";
import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

interface DogProfilePageUIProps {
  myDogData: IDog | undefined;
}

export default function DogProfilePageUI({ myDogData }: DogProfilePageUIProps) {
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onClickMyProfile =
    (dogId: string) => (event: MouseEvent<HTMLDivElement>) => {
      if (!(event.target instanceof HTMLDivElement)) return;
      router.push(`/profile/${dogId}`);
    };

  return (
    <S.Wrapper>
      <S.DogProfileWrapper>
        <S.DogProfile
          id={myDogData?.id}
          onClick={onClickMyProfile(myDogData?.id)}
        >
          <S.DogProfileImageWrapper>
            <Slider
              dots={settings.dots}
              infinite={settings.infinite}
              speed={settings.speed}
              slidesToShow={settings.slidesToShow}
              slidesToScroll={settings.slidesToScroll}
            >
              {myDogData?.img.map((el) => (
                <S.DogPhoto
                  key={uuid()}
                  imageUrl={"https://storage.googleapis.com/" + el.img}
                />
              ))}
            </Slider>
          </S.DogProfileImageWrapper>
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
          <div onClick={() => {}}>
            <S.ProfileEditButton>수정</S.ProfileEditButton>
          </div>
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
