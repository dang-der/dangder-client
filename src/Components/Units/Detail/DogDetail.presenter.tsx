import { useRouter } from "next/router";
import { IQuery } from "../../../Commons/Types/Generated/types";
import * as S from "./DogDetail.styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface DogDetailUIProps {
  handleCreateLike: (data: any) => void;
  interestsData: Pick<IQuery, "fetchMyDog"> | undefined;
  distanceData: Pick<IQuery, "fetchDogsDistance"> | undefined;
}

export default function DogDetailUI({
  handleCreateLike,
  interestsData,
  distanceData,
}: DogDetailUIProps) {
  const router = useRouter();

  const onClickMoveBack = () => {
    router.back();
  };

  const onClickMoveReport = () => {
    router.push("/report");
  };
  console.log(interestsData);
  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.DetailImageWrapper>
          <S.DetailImage>{interestsData?.fetchMyDog.img.img}</S.DetailImage>
        </S.DetailImageWrapper>

        <S.DetailContent>
          <S.DetailMaineTitle>
            <S.DetailInfor>
              <S.DetailName>{interestsData?.fetchMyDog.name},</S.DetailName>
              <S.DetailAge>{interestsData?.fetchMyDog.age}</S.DetailAge>
            </S.DetailInfor>
            <S.DetailMoveBackWrapper>
              <S.DetailContentMoveBack
                onClick={onClickMoveBack}
                src="/backIcon.png"
              />
            </S.DetailMoveBackWrapper>
            {/* <S.DetailReport>
                            <S.DetailMoveReport onClick={onClickMoveReport}></S.DetailMoveReport>
                            </S.DetailReport> */}
          </S.DetailMaineTitle>
          <S.DistanceWrapper>
            <LocationOnIcon style={{ cursor: "pointer" }} />
            <S.DetailKm>
              {distanceData?.fetchDogsDistance?.distance}Km
            </S.DetailKm>
          </S.DistanceWrapper>
          <S.DetailSubTitle>
            <S.DetailIntroduce>
              {interestsData?.fetchMyDog.description}
            </S.DetailIntroduce>
          </S.DetailSubTitle>
          <S.DetailSubMaineTitle>
            <S.DetailCharacterTitle>성격</S.DetailCharacterTitle>
            <S.DetailCharacterBox>
              <S.DetailCharacter>
                {interestsData?.fetchMyDog.interests.interest}
              </S.DetailCharacter>
              {/* <S.DetailCharacter>애교쟁이</S.DetailCharacter> 
                            <S.DetailCharacter>활발함</S.DetailCharacter>  */}
            </S.DetailCharacterBox>
          </S.DetailSubMaineTitle>
          <S.DetailSubMaineTitle>
            <S.DetailCharacterTitle>관심사</S.DetailCharacterTitle>
            <S.DetailCharacterBox>
              <S.DetailCharacter>
                {interestsData?.fetchMyDog.characters.character}
              </S.DetailCharacter>
              {/* <S.DetailCharacter>공놀이</S.DetailCharacter> 
                            <S.DetailCharacter>물놀이</S.DetailCharacter>  */}
            </S.DetailCharacterBox>
          </S.DetailSubMaineTitle>
          <S.DetailSubMaineTitle>
            <S.DetailCharacterTitle>기피견종</S.DetailCharacterTitle>
            <S.DetailCharacterBox>
              <S.DetailCharacter>
                {interestsData?.fetchMyDog.avoidBreeds.avoidBreed}
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
            <S.DetailFunctionLike
              onClick={handleCreateLike}
              src="/likeIcon.png"
            />
          </S.DetailFunctionIconWrapper>
        </S.DetailContent>
      </S.DetailWrapper>
    </S.Wrapper>
  );
}
