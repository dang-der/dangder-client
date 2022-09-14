import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  IQuery,
  IQueryFetchAroundDogsArgs,
  IQueryFetchDogsDistanceArgs,
} from "../../../Commons/Types/Generated/types";
import DogMainPageUI from "./DogMainPage.presenter";

// TODO: dogId를 가져오기 위해, 내 강아지 정보를 조회할 수 있는 api 필요!

// 주변 강아지 정보 조회
const FETCH_AROUND_DOGS = gql`
  query fetchAroundDogs($id: String!, $page: Float!) {
    fetchAroundDogs(id: $id, page: $page) {
      id
      name
      age
      description
      img {
        img
      }
    }
  }
`;

// 강아지 거리 조회
const FETCH_DOGS_DISTANCE = gql`
  query fetchDogsDistance($id: String!) {
    fetchDogsDistance(id: $id) {
      dogId
      distance
    }
  }
`;

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(position.coords.latitude + " " + position.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다."); // TODO: 위치 정보가 없으면 서비스 이용을 막아야함.
  }
};

export default function DogMainPage() {
  const [startPage, setStartPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const { data: AroundDogsData, refetch } = useQuery<
    Pick<IQuery, "fetchAroundDogs">,
    IQueryFetchAroundDogsArgs
  >(FETCH_AROUND_DOGS, {
    variables: { id: "bed24621-34be-4db0-be96-046cdef17c46", page: 1 },
  });

  console.log("around: ", AroundDogsData?.fetchAroundDogs);

  const { data: DogsDistanceData } = useQuery<
    Pick<IQuery, "fetchDogsDistance">,
    IQueryFetchDogsDistanceArgs
  >(FETCH_DOGS_DISTANCE, {
    variables: { id: "bed24621-34be-4db0-be96-046cdef17c46" },
  });

  console.log("distance: ", DogsDistanceData?.fetchDogsDistance);

  return (
    <DogMainPageUI
      getLocation={getLocation}
      AroundDogsData={AroundDogsData?.fetchAroundDogs}
      DogsDistanceData={DogsDistanceData?.fetchDogsDistance}
    />
  );
}
