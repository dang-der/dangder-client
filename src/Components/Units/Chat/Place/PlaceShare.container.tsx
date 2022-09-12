import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { placeMessageState } from "../../../../Commons/Store/Chat/Chat";
import LargeButton from "../../../Commons/Button/LargeButton";
import Map from "../../../Commons/Map/Map";
import * as S from "./PlaceShare.styles";

export default function PlaceShareContainer() {
  const router = useRouter();
  const [, setPlaceMessage] = useRecoilState(placeMessageState);

  const onClickPlaceShare = () => {
    // 소켓에서 바로 보내기
    router.back();
  };

  const onChangeMarker = ({ lat, lng }: { lat: number; lng: number }) => {
    console.log("onChangeMarker", lat, lng);
    setPlaceMessage({ lat, lng });
  };

  return (
    <S.Wrapper>
      <Map onChangeMarker={onChangeMarker} />

      <S.ButtonWrapper>
        <LargeButton title="장소 공유하기" onClick={onClickPlaceShare} />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
