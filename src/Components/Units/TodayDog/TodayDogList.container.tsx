import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import { passBuyModalVisibleState } from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationJoinChatRoomArgs,
  IQuery,
} from "../../../Commons/Types/Generated/types";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import TodayDogListUI from "./TodayDogList.presenter";
import {
  FETCH_INTEREST_CATEGORY,
  FETCH_LOGIN_USER_IS_CERT,
  FETCH_TODAY_DOG,
  JOIN_CHAT_ROOM,
} from "./TodayDogList.queries";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

export default function TodayDogList() {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState("");
  const [userInfo] = useRecoilState(userInfoState);
  const [, setBuyPassModalVisible] = useRecoilState(passBuyModalVisibleState);

  const { data: interestCategoryData } = useQuery<
    Pick<IQuery, "fetchInterestCategory">
  >(FETCH_INTEREST_CATEGORY);

  const { data: todayDogData } =
    useQuery<Pick<IQuery, "fetchTodayDog">>(FETCH_TODAY_DOG);

  const { data: loginUserIsCert } = useQuery<
    Pick<IQuery, "fetchLoginUserIsCert">
  >(FETCH_LOGIN_USER_IS_CERT);

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  const onClickPassTicket = async (pairId: string) => {
    setSelectedId(pairId);
    checkIsCert(pairId);
  };

  const checkIsCert = async (pairId: string) => {
    if (!loginUserIsCert?.fetchLoginUserIsCert) {
      setBuyPassModalVisible(true);
      return;
    }

    handleJoinChatRoom(pairId);
  };

  const handleJoinChatRoom = async (pairId?: string) => {
    try {
      const { data: joinChatRoomData } = await joinChatRoom({
        variables: {
          dogId: userInfo?.dog?.id || "",
          chatPairId: pairId || selectedId,
        },
      });

      if (!joinChatRoomData?.joinChatRoom.id) {
        throw Error("채팅방 입장 실패");
      }
      router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
    } catch (e) {
      console.log("handleJoinChatRoomError", e);
    }
  };

  return (
    <>
      <BuyPassTicketModal
        title="먼저 말을 걸기 위해서 <br />
            댕더 패스 구매가 필요해요!
            <br />"
        icon={<CampaignRoundedIcon />}
        redirectUrl="https://dangder.shop:3000/chat"
        onSuccess={handleJoinChatRoom}
      />
      <TodayDogListUI
        todayDogData={todayDogData}
        handleClickPassTicket={onClickPassTicket}
        interestCategoryData={interestCategoryData}
      />
    </>
  );
}
