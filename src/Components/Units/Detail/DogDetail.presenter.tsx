import { useRouter } from "next/router";

import {
  IDogImage,
  IQuery,
  IReview,
} from "../../../Commons/Types/Generated/types";

import * as S from "./DogDetail.styles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRecoilState } from "recoil";
import { nonmemberModalVisible } from "../../../Commons/Store/Modal/ModalVisibleState";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import { useEffect } from "react";
import ReviewItem from "../Review/Item/ReviewItem";

interface DogDetailUIProps {
  pickDogData: Pick<IQuery, "fetchOneDog"> | undefined;
  reviews: IReview[];
  handleClickLike: () => void;
  handleJoinChatRoom: () => Promise<void>;
  // distanceData: Pick<IQuery, "fetchDogsDistance"> | undefined;
}

export default function DogDetailUI({
  handleClickLike,
  handleJoinChatRoom,
  pickDogData,
  reviews,
}: DogDetailUIProps) {
  const router = useRouter();
  const [, setNonmemberModal] = useRecoilState(nonmemberModalVisible);
  const [userInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    if (!userInfo?.user) {
      setNonmemberModal(true);
    }
  }, [userInfo]);

  const onClickMoveBack = () => {
    router.back();
  };

  const onClickLike = () => {
    handleClickLike();
  };

  const onClickPass = () => {
    handleJoinChatRoom();
  };

  const onClickReport = () => {
    router.push(
      `/report?id=${userInfo?.user?.id || ""}&targetId=${
        pickDogData?.fetchOneDog.user.id || ""
      }`
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <S.Wrapper>
        <S.DetailWrapper>
          <S.DetailImageWrapper>
            <S.ReactSlick
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
            </S.ReactSlick>
          </S.DetailImageWrapper>
          <S.DetailContent>
            <S.DetailMaineTitle>
              <S.DetailInfo>
                <S.DetailName>
                  {pickDogData?.fetchOneDog.name},{" "}
                  {pickDogData?.fetchOneDog.age}
                </S.DetailName>
              </S.DetailInfo>
              <S.DetailInfo>
                <S.DetailGender>
                  {pickDogData?.fetchOneDog.gender === "수컷" ? (
                    <S.DogMaleIcon />
                  ) : (
                    <S.DogFemaleIcon />
                  )}
                </S.DetailGender>
                <S.DetailIsNeut>
                  {pickDogData?.fetchOneDog.isNeut
                    ? "(중성화 했어요)"
                    : "(중성화 안했어요)"}
                </S.DetailIsNeut>
              </S.DetailInfo>
            </S.DetailMaineTitle>

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

            <S.DetailFunctionIconWrapper>
              <S.DetailFunctionMoveBack
                onClick={onClickMoveBack}
                src="/backIcon1.png"
              />
              <S.DetailFunctionMoveBack
                onClick={onClickPass}
                src="/passIcon.png"
              />
              <S.DetailFunctionMoveBack
                onClick={onClickLike}
                src="/likeIcon.png"
              />
              <S.DetailFunctionMoveBack
                onClick={onClickReport}
                src="/report_btn.png"
              />
            </S.DetailFunctionIconWrapper>
          </S.DetailContent>

          <S.ReviewsWrapper>
            <S.SubTitleWrapper>
              👩🏻‍💻 {pickDogData?.fetchOneDog.name}님이 받은 매칭 후기
            </S.SubTitleWrapper>
            {reviews.map((e) => (
              <ReviewItem key={e.id} review={e} />
            ))}
          </S.ReviewsWrapper>
        </S.DetailWrapper>
      </S.Wrapper>
    </>
  );
}
