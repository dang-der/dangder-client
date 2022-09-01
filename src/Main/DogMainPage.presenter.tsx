import * as S from "./DogMainPage.styles";
import { v4 as uuidv4 } from "uuid";
import TinderCard from "react-tinder-card";
import Head from "next/head";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const customCss = `.swipe {
  position: absolute;
}

.cardContainer {
  width: 90vw;
  // max-width: 260px;
  // height: 300px;
}

.card {
  background-color: #fff;
  width: 80vw;
  max-width: 50.8rem;
  // height: 300px;
  // box-shadow: 0px 0px 60px 0px rgba(0,0,0,0.30);
  border-radius: 20px;
  // background-size: cover;
  // background-position: center;
}

.cardContent {
  width: 100%;
  height: 100%;
}

.swipe:last-of-type {

}`;

export default function DogMainPageUI(props: any) {
  return (
    <>
      <Head>
        <style>{customCss}</style>
      </Head>
      <S.Wrapper>
        <div className="cardContainer">
          {props.dogList.map((el: any, index: any) => (
            <TinderCard
              className="swipe"
              ref={props.childRefs[index]}
              key={uuidv4()}
              onSwipe={(dir) => props.swiped(dir, index)}
              onCardLeftScreen={(dir) => props.outOfFrame(el.name, index)}
            >
              <S.DogProfile className="card">
                <S.DogPhoto src={el.url} />
                <S.DogInfo>
                  <S.DogInfoHeader>
                    <S.DogName>{el.name}</S.DogName>
                    <S.DogAge>{el.age}</S.DogAge>
                  </S.DogInfoHeader>
                  <S.DogInfoBody>
                    <S.DogDistance>{el.distance}km</S.DogDistance>
                    <S.DogPlay>{el.play}</S.DogPlay>
                  </S.DogInfoBody>
                </S.DogInfo>
              </S.DogProfile>
            </TinderCard>
          ))}
        </div>
        <S.ButtonWrapper>
          <S.SwipeButtons>
            <S.DislikeButton
              // style={{ backgroundColor: !props.canSwipe && "#c3c4d3" }}
              onClick={() => {
                props.swipe("left");
              }}
            >
              <CloseIcon />
            </S.DislikeButton>
            <S.LikeButton
              // style={{ backgroundColor: !props.canSwipe && "#c3c4d3" }}
              onClick={() => props.swipe("right")}
            >
              <FavoriteIcon />
            </S.LikeButton>
            <S.PowerPassButton>
              <FlashOnIcon />
            </S.PowerPassButton>
          </S.SwipeButtons>
        </S.ButtonWrapper>
        <div>
          {props.lastDirection ? (
            <h2 key={props.lastDirection} className="infoText">
              You swiped {props.lastDirection}
            </h2>
          ) : (
            <h2 className="infoText"></h2>
          )}
        </div>
      </S.Wrapper>
    </>
  );
}
