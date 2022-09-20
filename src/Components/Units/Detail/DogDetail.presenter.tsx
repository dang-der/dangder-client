import { useRouter } from "next/router";
import {
  IDog,
  IDogImage,
  IQuery,
} from "../../../Commons/Types/Generated/types";
import * as S from "./DogDetail.styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DogDetailUIProps {
  handleCreateLike: () => Promise<void>;
  pickDogData: Pick<IQuery, "fetchOneDog"> | undefined;
  handleJoinChatRoom: () => Promise<void>;
  // distanceData: Pick<IQuery, "fetchDogsDistance"> | undefined;
}

export default function DogDetailUI({
  handleCreateLike,
  handleJoinChatRoom,
  pickDogData,
}: DogDetailUIProps) {
  const router = useRouter();

  const onClickMoveBack = () => {
    router.back();
  };

  const onClickLike = () => {
    handleCreateLike();
  };

  const onClickPass = () => {
    handleJoinChatRoom();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
            {pickDogData?.fetchOneDog.img.map((e: IDogImage) => (
              <S.ImageWrapper key={e.id} id={e.id}>
                <S.DetailImage
                  src={`https://storage.googleapis.com/${e.img}`}
                />
              </S.ImageWrapper>
            ))}
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
          {/* <S.DistanceWrapper>
            <LocationOnIcon style={{ cursor: "pointer" }} />
            <S.DetailKm>
              {distanceData?.fetchDogsDistance?.}Km
            </S.DetailKm>
          </S.DistanceWrapper> */}
          <S.DetailSubTitle>
            <S.DetailIntroduce>
              {pickDogData?.fetchOneDog.description}
            </S.DetailIntroduce>
          </S.DetailSubTitle>

          <S.DetailSubMaineTitle>
            {(pickDogData?.fetchOneDog.characters.length || 0) > 0 && (
              <div>
                <S.DetailCharacterTitle>성격</S.DetailCharacterTitle>
                <S.DetailCharacterBox>
                  <S.DetailCharacter>
                    {pickDogData?.fetchOneDog?.characters.map((e) => (
                      <S.Tags key={e.id}>{e.character}</S.Tags>
                    ))}
                  </S.DetailCharacter>
                </S.DetailCharacterBox>
              </div>
            )}
          </S.DetailSubMaineTitle>

          <S.DetailSubMaineTitle>
            {(pickDogData?.fetchOneDog.interests.length || 0) > 0 && (
              <div>
                <S.DetailCharacterTitle>관심사</S.DetailCharacterTitle>
                <S.DetailCharacterBox>
                  <S.DetailCharacter>
                    {pickDogData?.fetchOneDog?.interests.map((e) => (
                      <S.Tags key={e.id}>{e.interest}</S.Tags>
                    ))}
                  </S.DetailCharacter>
                </S.DetailCharacterBox>
              </div>
            )}
          </S.DetailSubMaineTitle>
          <S.DetailSubMaineTitle>
            {(pickDogData?.fetchOneDog.avoidBreeds.length || 0) > 0 && (
              <div>
                <S.DetailCharacterTitle>기피견종</S.DetailCharacterTitle>
                <S.DetailCharacterBox>
                  <S.DetailCharacter>
                    {pickDogData?.fetchOneDog?.avoidBreeds.map((e) => (
                      <S.Tags key={e.id}>{e.avoidBreed}</S.Tags>
                    ))}
                  </S.DetailCharacter>
                </S.DetailCharacterBox>
              </div>
            )}
          </S.DetailSubMaineTitle>
          <S.DetailFunctionIconWrapper>
            <S.DetailFunctionMoveBack
              onClick={onClickMoveBack}
              src="/backIcon1.png"
            />
            <S.DetailFunctionMoveChat
              onClick={onClickPass}
              src="/passIcon.png"
            />
            <S.DetailFunctionLike onClick={onClickLike} src="/likeIcon.png" />
          </S.DetailFunctionIconWrapper>
        </S.DetailContent>
      </S.DetailWrapper>
    </S.Wrapper>
  );
}
