import { useState } from "react";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";

import LargeButton from "../../../Commons/Button/LargeButton";
import Map from "../../../Commons/Map/Map";

import * as S from "./PlaceShare.styles";


interface PlaceShareContainerProps {
  handleEmitSend: (payload: { type: string; data: any }) => void;
  toggleModal: () => void;
}

export default function PlaceShareContainer({
  handleEmitSend,
  toggleModal,
}: PlaceShareContainerProps) {
  const [position, setPosition] = useState<
    { lat: number; lng: number } | undefined
  >();

  const onClickPlaceShare = () => {
    console.log("onClickPlaceShare");
    handleEmitSend({
      type: "place",
      data: position,
    });
    toggleModal();
  };

  const onChangeMarker = ({ lat, lng }: { lat: number; lng: number }) => {
    console.log("onChangeMarker", lat, lng);
    setPosition({ lat, lng });
  };

  const getCurrentPosition = () => {
    console.log("getCurrentPosition");
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("getCurrentPosition", position);
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <S.PlaceWrapper>
      <Map onChangeMarker={onChangeMarker} position={position} />

      <S.ButtonsWrapper>
        <S.CurrentPositionWrapper onClick={getCurrentPosition}>
          <MyLocationRoundedIcon />
        </S.CurrentPositionWrapper>

        <LargeButton
          title="장소 공유하기"
          onClick={onClickPlaceShare}
          style={{ width: "100%" }}
        />
      </S.ButtonsWrapper>
    </S.PlaceWrapper>
  );
}
