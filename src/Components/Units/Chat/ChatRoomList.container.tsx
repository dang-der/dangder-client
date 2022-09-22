import { useMutation, useQuery } from "@apollo/client";
import { TrySharp } from "@mui/icons-material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IMutation,
  IMutationDeleteChatRoomArgs,
  IQuery,
  IQueryFetchChatRoomsArgs,
} from "../../../Commons/Types/Generated/types";
import { DELETE_CHAT_ROOM, FETCH_CHAT_ROOMS } from "./Chat.queries";
import ChatListUI from "./ChatRoomList.presenter";

export default function ChatListContainer() {
  const [userInfo] = useRecoilState(userInfoState);

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

  

  return (
    <ChatListUI
      chatList={chatRoomListData?.fetchChatRooms}
      handleDeleteChatRoom={handleDeleteChatRoom}
    />
  );
}
