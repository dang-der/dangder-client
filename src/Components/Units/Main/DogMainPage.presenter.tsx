import * as S from "./DogMainPage.styles";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";

const defaultCss = `
@keyframes popup {
	0% {
		transform: scale(1, 1);
	}
	10% {
		transform: scale(1.1, 1.1);
	}
	30% {
		transform: scale(0.9, 0.9);
	}
	50% {
		transform: scale(1, 1);
	}
	57% {
		transform: scale(1, 1);
	}
	64% {
		transform: scale(1, 1);
	}
	100% {
		transform: scale(1, 1);
	}
}
`;

export default function DogMainPageUI(props: any) {
  const router = useRouter();

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction: any, nameToDelete: any) => {
    setLastDirection(direction);
  };

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
      <Head>
        <style>{defaultCss}</style>
      </Head>
      <S.LocationWrapper>
        <S.LocationButton onClick={props.getLocation}>
          <S.LocationIcon />
        </S.LocationButton>
      </S.LocationWrapper>
      <S.Wrapper>
        <S.DogCardWrapper>
          {props.dogList.map((character: any) => (
            <S.TinderCardWrapper
              key={uuidv4()}
              onSwipe={(dir: any) => swiped(dir, character.name)}
              preventSwipe={["up", "down"]}
            >
              <S.DogProfile
                style={{
                  backgroundImage: "url(" + character.url + ")",
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
                    <S.DogPlay>{character.play}</S.DogPlay>
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
