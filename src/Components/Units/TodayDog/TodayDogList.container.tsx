import { useMutation, useQuery } from "@apollo/client";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/router";
import { useState } from "react";

import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  exceptionModalState,
  passBuyModalVisibleState,
  selectedDogIdBuyPassState,
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

  const [open, setOpen] = useState(false);
  const [userInfo] = useRecoilState(userInfoState);
  const [visible, setVisible] = useRecoilState(passBuyModalVisibleState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [, setSelectedDogId] = useRecoilState(selectedDogIdBuyPassState);

  const { data: todayDogData } =
    useQuery<Pick<IQuery, "fetchTodayDog">>(FETCH_TODAY_DOG);

  const { data: userIsCert } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  const handleJoinChatRoom = async (pairDogId: string) => {
    console.log("handleClickChatRoom");
    if (!userIsCert?.fetchLoginUserIsCert) {
      setVisible(true);
      setSelectedDogId(pairDogId);
    } else {
      try {
        const { data: joinChatRoomData } = await joinChatRoom({
          variables: {
            dogId: userInfo?.dog?.id || "",
            chatPairId: pairDogId,
          },
        });

        if (!joinChatRoomData?.joinChatRoom.id) throw Error("채팅방 입장 실패");
        setOpen(true);
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
