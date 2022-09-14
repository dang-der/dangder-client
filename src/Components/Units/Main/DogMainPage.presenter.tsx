import * as S from "./DogMainPage.styles";
import { useState } from "react";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";

export default function DogMainPageUI(props: any) {
  const router = useRouter();

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction: any, nameToDelete: any) => {
    setLastDirection(direction);
  };

  // 상세 페이지로 이동
  const MoveToDogDetailPage = () => {
    router.push(`/${router.query.dogId}`);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <S.LocationWrapper>
        <S.LocationButton onClick={props.getLocation}>
          <S.LocationIcon />
        </S.LocationButton>
      </S.LocationWrapper>
      <S.Wrapper>
        <S.DogCardWrapper className="cardContainer">
          {props.AroundDogsData?.map((character: any, index: number) => (
            <S.TinderCardWrapper
              className="swipe"
              key={index}
              onSwipe={(dir: any) => swiped(dir, character.name)}
              preventSwipe={["up", "down"]}
            >
              <S.DogProfile
                className="card"
                style={{
                  backgroundImage: "url(" + character.img[0].img + ")",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              >
                <S.DogInfo>
                  <S.DogInfoHeader>
                    <S.DogInfoTitle>
                      <S.DogName>{character.name}</S.DogName>
                      <S.DogAge>, {character.age}</S.DogAge>
                    </S.DogInfoTitle>
                    <InfoIcon />
                  </S.DogInfoHeader>
                  <S.DogInfoBody>
                    <S.DistanceWrapper>
                      <LocationOnIcon onClick={MoveToDogDetailPage} />
                      <S.DogDistance>{character.distance}km</S.DogDistance>
                    </S.DistanceWrapper>
                    <S.DogDescription>{character.description}</S.DogDescription>
                  </S.DogInfoBody>
                </S.DogInfo>
              </S.DogProfile>
              <Link href="/payments">
                <S.PassButton>
                  <S.SparkIcon />
                </S.PassButton>
              </Link>
            </S.TinderCardWrapper>
          ))}
        </S.DogCardWrapper>
      </S.Wrapper>
    </div>
  );
}
