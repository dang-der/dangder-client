import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  matchedModalVisibleState,
  passBuyModalVisibleState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateLikeArgs,
  IMutationIsLikeArgs,
  IMutationJoinChatRoomArgs,
  IQuery,
  IQueryFetchDogsDistanceArgs,
  IQueryFetchOneDogArgs,
} from "../../../Commons/Types/Generated/types";
import MatchedModal from "../Main/MatchedModal/MatchedModal";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";

import DogDetailUI from "./DogDetail.presenter";
import {
  CREATE_LIKE,
  FETCH_LOGIN_USER_IS_CERT,
  // FETCH_DOG_DISTANCE,
  FETCH_ONE_DOG,
  JOIN_CHAT_ROOM,
} from "./DogDetail.queries";

export default function DogDetail() {
  const router = useRouter();
  const [, setVisibleLike] = useRecoilState(matchedModalVisibleState);
  const [, setVisibleChat] = useRecoilState(passBuyModalVisibleState);
  const [userInfo] = useRecoilState(userInfoState);
  const { data: userIsCert } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );
  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  // const [data] = useQuery<Pick<IQuery, "fetchDogsDistance">, IQueryFetchDogsDistanceArgs>(FETCH_DOG_DISTANCE)
  // const [data] = useQuery<Pick<IQuery, "fetchMyDog">, IQueryFetchMyDogArgs>(FETCH_MY_DOG)

  // const { data: distanceData } = useQuery<
  //   Pick<IQuery, "fetchDogsDistance">,
  //   IQueryFetchDogsDistanceArgs
  // >(FETCH_DOG_DISTANCE, {
  //   variables: { id: String(router.query.dogId) },
  // });

  const { data: pickDogData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, {
    variables: { id: String(router.query.dogId) },
  });

  const [createLike] = useMutation<
    Pick<IMutation, "createLike">,
    IMutationCreateLikeArgs
  >(CREATE_LIKE);

  const handleCreateLike = async () => {
    try {
      const { data: matchUserData } = await createLike({
        variables: {
          createLikeInput: {
            sendId: String(userInfo?.dog?.id),
            receiveId: String(router.query.dogId),
          },
        },
      });

      if (!matchUserData?.createLike.isMatch) {
        return;
      }

      setVisibleLike(true);
    } catch (e) {
      console.log("handleClickLikeError", e);
    }
  };

  const handleJoinChatRoom = async () => {
    if (!userIsCert?.fetchLoginUserIsCert) {
      setVisibleChat(true);
    } else {
      try {
        const { data: joinChatRoomData } = await joinChatRoom({
          variables: {
            dogId: String(router.query.dogId),
            chatPairId: String(router.query.dogId),
          },
        });

        if (!joinChatRoomData?.joinChatRoom.id) {
          throw Error("채팅방 입장 실패");
          return;
        }

        router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
        setVisibleChat(false);
      } catch (e) {
        console.log("handleJoinChatRoomError", e);
      }
    }
  };

  return (
    <>
      <BuyPassTicketModal />
      <MatchedModal />
      <DogDetailUI
        handleCreateLike={handleCreateLike}
        handleJoinChatRoom={handleJoinChatRoom}
        // distanceData={distanceData}
        pickDogData={pickDogData}
      />
    </>
  );
}
