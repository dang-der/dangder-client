import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreateChatRoomArgs,
  IMutationIsLikeArgs,
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

// 매칭 여부
const IS_LIKE = gql`
  mutation isLike($sendId: String!, $receivedId: String!) {
    isLike(sendId: $sendId, receivedId: $receivedId)
  }
`;

// 채팅방 생성
const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom($dogId: String!, $chatPairId: String!) {
    createChatRoom(dogId: $dogId, chatPairId: $chatPairId) {
      id
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
  const { data: AroundDogsData } = useQuery<
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

  const [isLike] = useMutation<Pick<IMutation, "isLike">, IMutationIsLikeArgs>(
    IS_LIKE
  );

  const [createChatRoom] = useMutation<
    Pick<IMutation, "createChatRoom">,
    IMutationCreateChatRoomArgs
  >(CREATE_CHAT_ROOM);

  return (
    <DogMainPageUI
      getLocation={getLocation}
      AroundDogsData={AroundDogsData?.fetchAroundDogs}
      DogsDistanceData={DogsDistanceData?.fetchDogsDistance}
    />
  );
}
