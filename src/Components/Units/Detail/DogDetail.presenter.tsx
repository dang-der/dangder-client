import { useRouter } from "next/router";
import { IQuery } from "../../../Commons/Types/Generated/types";
import * as S from "./DogDetail.styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DogDetailUIProps {
  handleCreateLike: () => Promise<void>;
  pickDogData: Pick<IQuery, "fetchOneDog"> | undefined;
  distanceData: Pick<IQuery, "fetchDogsDistance"> | undefined;
}

export default function DogDetailUI({
  handleCreateLike,
  pickDogData
  ,
}: DogDetailUIProps) {
  const router = useRouter();

  const onClickMoveBack = () => {
    router.back();
  };

  const onClickLike = () => {
    handleCreateLike();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const onClickMoveReport = () => {
  //   router.push("/report");
  // };
  console.log(pickDogData);
  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.DetailImageWrapper>
          <Slider
            dots={settings.dots}
            infinite={settings.infinite}
            speed={settings.speed}
            slidesToShow={settings.slidesToShow}
            slidesToScroll={settings.slidesToScroll}
          >
            <S.DetailImage
              src={pickDogData?.fetchOneDog?.img[0].img}
            ></S.DetailImage>
            <S.DetailImage
              // src={"/dog2.jpeg"}
              src={pickDogData?.fetchOneDog?.img[0]?.img}
            ></S.DetailImage>
            <S.DetailImage
              // src={"/dog5.jpeg"}
              src={pickDogData?.fetchOneDog?.img[0]?.img}
            ></S.DetailImage>
          </Slider>
        </S.DetailImageWrapper>

        <S.DetailContent>
          <S.DetailMaineTitle>
            <S.DetailInfor>
              <S.DetailName>{pickDogData?.fetchOneDog.name},</S.DetailName>
              <S.DetailAge>{pickDogData?.fetchOneDog.age}</S.DetailAge>
            </S.DetailInfor>
            <S.DetailMoveBackWrapper>
              {/* <S.DetailContentMoveBack
                onClick={onClickMoveBack}
                src="/backIcon.png"
              /> */}
            </S.DetailMoveBackWrapper>
            {/* <S.DetailReport>
                            <S.DetailMoveReport onClick={onClickMoveReport}></S.DetailMoveReport>
                            </S.DetailReport> */}
          </S.DetailMaineTitle>
          <S.DistanceWrapper>
            <LocationOnIcon style={{ cursor: "pointer" }} />
            <S.DetailKm>
              {/* {distanceData?.fetchDogsDistance?.}Km */}
            </S.DetailKm>
          </S.DistanceWrapper>
          <S.DetailSubTitle>
            <S.DetailIntroduce>
              {pickDogData?.fetchOneDog.description}
            </S.DetailIntroduce>
          </S.DetailSubTitle>
          <S.DetailSubMaineTitle>
            <S.DetailCharacterTitle>성격</S.DetailCharacterTitle>
            <S.DetailCharacterBox>
              <S.DetailCharacter>
                {pickDogData?.fetchOneDog?.interests[0]}
              </S.DetailCharacter>
              {/* <S.DetailCharacter>애교쟁이</S.DetailCharacter> 
                            <S.DetailCharacter>활발함</S.DetailCharacter>  */}
            </S.DetailCharacterBox>
          </S.DetailSubMaineTitle>
          <S.DetailSubMaineTitle>
            <S.DetailCharacterTitle>관심사</S.DetailCharacterTitle>
            <S.DetailCharacterBox>
              <S.DetailCharacter>
                {pickDogData?.fetchOneDog?.characters[0]}
              </S.DetailCharacter>
              {/* <S.DetailCharacter>공놀이</S.DetailCharacter> 
                            <S.DetailCharacter>물놀이</S.DetailCharacter>  */}
            </S.DetailCharacterBox>
          </S.DetailSubMaineTitle>
          <S.DetailSubMaineTitle>
            <S.DetailCharacterTitle>기피견종</S.DetailCharacterTitle>
            <S.DetailCharacterBox>
              <S.DetailCharacter>
                {pickDogData?.fetchOneDog?.avoidBreeds[0]}
              </S.DetailCharacter>
              {/* <S.DetailCharacter>공놀이</S.DetailCharacter> 
                            <S.DetailCharacter>물놀이</S.DetailCharacter>  */}
            </S.DetailCharacterBox>
          </S.DetailSubMaineTitle>
          <S.DetailFunctionIconWrapper>
            <S.DetailFunctionMoveBack
              onClick={onClickMoveBack}
              src="/backIcon1.png"
            />
            <S.DetailFunctionMoveChat src="/passIcon.png" />
            <S.DetailFunctionLike onClick={onClickLike} src="/likeIcon.png" />
          </S.DetailFunctionIconWrapper>
        </S.DetailContent>
      </S.DetailWrapper>
    </S.Wrapper>
  );
}
