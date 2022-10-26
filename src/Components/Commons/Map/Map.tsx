import styled from "@emotion/styled";
import { memo, useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 1rem;
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
`;

declare const window: typeof globalThis & {
  kakao: any;
};

interface IMapProps {
  position?: { lat: number; lng: number };
  address?: string;
  onChangeMarker?: (obj: { lat: number; lng: number }) => void;
}

function Map({ position, address, onChangeMarker }: IMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>();
  const [ps, setPs] = useState<any>();
  const [infowindow, setInfoWindow] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=d860e7570db760ac5d5ed92bbabf6e21&autoload=false&libraries=services";
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const coords = new window.kakao.maps.LatLng(33.450701, 126.570667);

        const imageSrc = "/ic_marker.svg";
        const imageSize = new window.kakao.maps.Size(64, 69);

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        const marker = new window.kakao.maps.Marker({
          position: coords,
          image: markerImage,
        });

        setMarker(marker);

        const options = {
          center: coords,
          level: 3,
        };

        if (!mapContainerRef.current) return;
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);

        setMap(map);
        setPs(new window.kakao.maps.services.Places());
        setInfoWindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
        marker.setMap(map);

        if (!onChangeMarker) return;

        window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
          console.log("map Click", mouseEvent.latLng);
          const latlng = mouseEvent.latLng;
          marker.setPosition(latlng);

          if (!onChangeMarker) return;

          onChangeMarker({
            lat: Number(latlng.getLat()),
            lng: Number(latlng.getLng()),
          });
        });
      });
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    if (position?.lat && position?.lng) {
      const coord = new window.kakao.maps.LatLng(position.lat, position.lng);
      marker.setPosition(coord);
      map.setCenter(coord);
    }
  }, [position, map, address]);

  const handleSearch = (keyword: string) => {
    ps.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
      if (status !== window.kakao.maps.services.Status.OK) return;

      const bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          const { x, y } = data[i];

          marker.setPosition(new window.kakao.maps.LatLng(y, x));

          if (onChangeMarker) onChangeMarker({ lat: y, lng: x });

          window.kakao.maps.event.addListener(marker, "click", function () {
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                data[i].place_name +
                "</div>"
            );
            infowindow.open(map, marker);
          });
        }
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      map.setBounds(bounds);
    });
  };

  return (
    <>
      <Header>
        <SearchBar onSearch={handleSearch} />
      </Header>
      <Wrapper ref={mapContainerRef} />
    </>
  );
}

export default memo(Map);
