import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  exceptionModalState,
  passBuyModalVisibleState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationJoinChatRoomArgs,
  IQuery,
} from "../../../Commons/Types/Generated/types";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import TodayDogListUI from "./TodayDogList.presenter";
import {
  FETCH_LOGIN_USER_IS_CERT,
  FETCH_TODAY_DOG,
  JOIN_CHAT_ROOM,
} from "./TodayDogList.queries";

export default function TodayDogList() {
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);
  const [visible, setVisible] = useRecoilState(passBuyModalVisibleState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const { data: todayDogData } =
    useQuery<Pick<IQuery, "fetchTodayDog">>(FETCH_TODAY_DOG);

  const { data: userIsCert } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  const handleJoinChatRoom = async () => {
    if (!userIsCert?.fetchLoginUserIsCert) {
      setVisible(true);
    } else {
      try {
        const { data: joinChatRoomData } = await joinChatRoom({
          variables: {
            dogId: userInfo?.dog?.id || "",
            chatPairId: String(router.query.dogId),
          },
        });

        if (!joinChatRoomData?.joinChatRoom.id) throw Error("채팅방 입장 실패");

        router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
      } catch (e) {
        console.log("handleJoinChatRoomError", e);
        if (e instanceof Error) {
          setExceptionModal({ visible: true, message: e.message });
        }
      }
    }
  };

  return (
    <>
      <BuyPassTicketModal />
      <TodayDogListUI
        todayDogData={todayDogData}
        handleJoinChatRoom={handleJoinChatRoom}
      />
    </>
  );
}
