import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Router, TrySharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../Commons/Store/Auth/AccessToken";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IMutation,
  IMutationDeleteChatRoomArgs,
  IQuery,
  IQueryFetchChatRoomsArgs,
} from "../../../Commons/Types/Generated/types";
import {
  DELETE_CHAT_ROOM,
  FETCH_CHAT_ROOMS,
  FETCH_ONE_DOG,
} from "./Chat.queries";
import ChatListUI from "./ChatRoomList.presenter";

export default function ChatListContainer() {
  const client = useApolloClient();
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);
  const [token] = useRecoilState(accessTokenState);

  const { data: chatRoomListData, refetch } = useQuery<
    Pick<IQuery, "fetchChatRooms">,
    IQueryFetchChatRoomsArgs
  >(FETCH_CHAT_ROOMS, {
    variables: {
      dogId: userInfo?.dog?.id || "",
    },
  });

  const [deleteChatRoom] = useMutation<
    Pick<IMutation, "deleteChatRoom">,
    IMutationDeleteChatRoomArgs
  >(DELETE_CHAT_ROOM);

  useEffect(() => {
    refetch({ dogId: userInfo?.dog?.id || "" });
  });

  const handleDeleteChatRoom = (roomId: string) => {
    try {
      deleteChatRoom({
        variables: { id: roomId },
        refetchQueries: [
          {
            query: FETCH_CHAT_ROOMS,
            variables: { dogId: userInfo?.dog?.id || "" },
          },
        ],
      });
    } catch (e) {
      console.log("deleteChatRoomError", e);
    }
  };

  const handleReportUser = async (targetDogId: string | undefined) => {
    console.log("handleReportUser", targetDogId);
    if (!targetDogId) return;

    try {
      const { data: targetData } = await client.query<
        Pick<IQuery, "fetchOneDog">
      >({
        query: FETCH_ONE_DOG,
        variables: { id: targetDogId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const target = targetData.fetchOneDog.user.id;
      if (!target) throw Error("존재하지 않는 유저입니다.");

      router.push(`/report?id=${userInfo?.user?.id || ""}&targetId=${target}`);
    } catch (e) {}
  };

  return (
    <ChatListUI
      chatList={chatRoomListData?.fetchChatRooms}
      handleDeleteChatRoom={handleDeleteChatRoom}
      handleReportUser={handleReportUser}
    />
  );
}
