import { useRouter } from "next/router"
import * as S from "./DogDetail.styles"



interface DogDetailUIProps{
    handleCreateLike : (data: any) =>void
    // selectedData: {
    //     characters: Pick<IQuery, "fetchCharacters"> | undefined;
    //     interests: Pick<IQuery, "fetchInterests"> | undefined;
    //   };
}

export default function DogDetailUI({handleCreateLike, selectedData} : DogDetailUIProps) {
    const router = useRouter()

        const onClickMoveBack = () => {
        router.back()
    }

    const onClickMoveReport = () => {
        router.push('/report')
    }

    return(
        <S.Wrapper >
            <S.DetailWrapper>
            <S.DetailImageWrapper>
            <S.DetailImage>{selectedData.fetchMyDog.img}</S.DetailImage>
            </S.DetailImageWrapper>
                    <S.DetailContent>
                        <S.DetailMaineTitle>
                            <S.DetailInfor>
                            <S.DetailName>{selectedData.fetchMyDog.name},</S.DetailName>
                            <S.DetailAge>{selectedData.fetchMyDog.age}</S.DetailAge>
                            <S.DetailKm>{selectedData.fetchDogsDistance.distance}Km</S.DetailKm>
                            </S.DetailInfor>
                            <S.DetailReport>
                            <S.DetailMoveReport onClick={onClickMoveReport}></S.DetailMoveReport>
                            </S.DetailReport>
                        </S.DetailMaineTitle>
                        <S.DetailSubTitle>
                            <S.DetailIntroduce>{selectedData.fetchMyDog.description}</S.DetailIntroduce>
                        </S.DetailSubTitle>
                        <S.DetailSubMaineTitle>
                            <S.DetailCharacterTitle>성격</S.DetailCharacterTitle>
                            <S.DetailCharacterBox>
                            <S.DetailCharacter>{selectedData.fetchMyDog.interests.interest}</S.DetailCharacter>
                            {/* <S.DetailCharacter>애교쟁이</S.DetailCharacter> 
                            <S.DetailCharacter>활발함</S.DetailCharacter>  */}
                            </S.DetailCharacterBox>
                        </S.DetailSubMaineTitle>
                        <S.DetailSubMaineTitle>
                            <S.DetailCharacterTitle>관심사</S.DetailCharacterTitle>
                            <S.DetailCharacterBox>
                            <S.DetailCharacter>{selectedData.fetchMyDog.characters.character}</S.DetailCharacter>
                            {/* <S.DetailCharacter>공놀이</S.DetailCharacter> 
                            <S.DetailCharacter>물놀이</S.DetailCharacter>  */}
                            </S.DetailCharacterBox>
                        </S.DetailSubMaineTitle>
                        <S.DetailFunctionIconWrapper>
                        <S.DetailFunctionMoveBack onClick={onClickMoveBack}>{}</S.DetailFunctionMoveBack>
                        <S.DetailFunctionMoveChat onClick={onClickMoveChat}>{}</S.DetailFunctionMoveChat>
                        <S.DetailFunctionLike onClick={handleCreateLike}>{}</S.DetailFunctionLike>
                        </S.DetailFunctionIconWrapper>
                        <S.DetailContentMoveBack onClick={onClickMoveBack}>{}</S.DetailContentMoveBack>
                    </S.DetailContent>
            </S.DetailWrapper> 
        </S.Wrapper>
    ) 
} 