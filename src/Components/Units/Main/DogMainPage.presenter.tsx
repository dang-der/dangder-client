import * as S from "./DogMainPage.styles";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";

const defaultCss = `
#root > div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.app > div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.row {
	flex-direction: row !important;
}

.row > * {
	margin: 5px;
}

.swipe {
	position: absolute;
}


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
  console.log(router);

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction: any, nameToDelete: any) => {
    console.log(`removing: ${nameToDelete}`);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  // 상세페이지로 이동
  // const MoveToDogDetailPage = () => {
  //   router.push(`/${router.query.dogId}`);
  // };

  return (
    <>
      <Head>
        <style>{defaultCss}</style>
      </Head>
      <S.LocationWrapper>
        <S.LocationButton onClick={props.getLocation}>
          <S.LocationIcon />
        </S.LocationButton>
      </S.LocationWrapper>
      <S.Wrapper>
        <div>
          <S.DogCardWrapper className="cardContainer">
            {props.dogList.map((character: any) => (
              <TinderCard
                className="swipe"
                key={uuidv4()}
                onSwipe={(dir) => swiped(dir, character.name)}
                onCardLeftScreen={() => outOfFrame(character.name)}
                preventSwipe={["left", "right"]}
              >
                <S.DogProfile
                  style={{ backgroundImage: "url(" + character.url + ")" }}
                  className="card"
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
                        <LocationOnIcon />
                        <S.DogDistance>{character.distance}km</S.DogDistance>
                      </S.DistanceWrapper>
                      <S.DogPlay>{character.play}</S.DogPlay>
                    </S.DogInfoBody>
                  </S.DogInfo>
                </S.DogProfile>
              </TinderCard>
            ))}
          </S.DogCardWrapper>
          <Link href="/payments">
            <S.PassButton>
              <S.SparkIcon />
            </S.PassButton>
          </Link>
        </div>
        {/* 스와이프가 잘 작동하는지 확인 */}
        {lastDirection ? (
          <h2 className="infoText" style={{ position: "fixed", bottom: "2vh" }}>
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText" />
        )}
      </S.Wrapper>
    </>
  );
}
