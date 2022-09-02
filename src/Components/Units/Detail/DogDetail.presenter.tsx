import * as S from "./DogDetail.styles"
export default function DogDetailUI(props: any) {


    return(
        <S.Wrapper >
            <S.DetailWrapper>
            <S.DetailImageWrapper>
            <S.DetailImage src="/pug.jpg"/>
            </S.DetailImageWrapper>
                    <S.DetailContent>
                        <S.DetailMaineTitle>
                            <S.DetailInfor>
                            <S.DetailName>까미,</S.DetailName>
                            <S.DetailAge>2</S.DetailAge>
                            <S.DetailKm>2Km</S.DetailKm>
                            </S.DetailInfor>
                            <S.DetailReport>
                            <S.DetailMoveReport onClick={props.onClickMoveReport}></S.DetailMoveReport>
                            </S.DetailReport>
                        </S.DetailMaineTitle>
                        <S.DetailSubTitle>
                            <S.DetailIntroduce>사진찍기가 좋은 퍼그</S.DetailIntroduce>
                        </S.DetailSubTitle>
                        <S.DetailSubMaineTitle>
                            <S.DetailCharacterTitle>성격</S.DetailCharacterTitle>
                            <S.DetailCharacterBox>
                            <S.DetailCharacter>온순함</S.DetailCharacter>
                            <S.DetailCharacter>애교쟁이</S.DetailCharacter> 
                            <S.DetailCharacter>활발함</S.DetailCharacter> 
                            </S.DetailCharacterBox>
                        </S.DetailSubMaineTitle>
                        <S.DetailSubMaineTitle>
                            <S.DetailCharacterTitle>관심사</S.DetailCharacterTitle>
                            <S.DetailCharacterBox>
                            <S.DetailCharacter>사진찍기</S.DetailCharacter>
                            <S.DetailCharacter>공놀이</S.DetailCharacter> 
                            <S.DetailCharacter>물놀이</S.DetailCharacter> 
                            </S.DetailCharacterBox>
                        </S.DetailSubMaineTitle>
                        <S.DetailFunctionIconWrapper>
                        <S.DetailFunctionMoveBack onClick={props.onClickMoveBack}>{}</S.DetailFunctionMoveBack>
                        <S.DetailFunctionMoveChat onClick={props.onClickMoveChat}>{}</S.DetailFunctionMoveChat>
                        <S.DetailFunctionLike onClick={props.onClickLike}>{}</S.DetailFunctionLike>
                        </S.DetailFunctionIconWrapper>
                        <S.DetailContentMoveBack onClick={props.onClickMoveBack}>{}</S.DetailContentMoveBack>
                    </S.DetailContent>
            </S.DetailWrapper> 
        </S.Wrapper>
    ) 
} 