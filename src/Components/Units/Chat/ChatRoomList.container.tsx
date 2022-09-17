import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IQuery,
  IQueryFetchChatRoomsArgs,
} from "../../../Commons/Types/Generated/types";
import { FETCH_CHAT_ROOMS } from "./Chat.queries";
import ChatListUI from "./ChatRoomList.presenter";

export default function ChatListContainer() {
  const [userInfo] = useRecoilState(userInfoState);

  const { data: chatRoomListData } = useQuery<
    Pick<IQuery, "fetchChatRooms">,
    IQueryFetchChatRoomsArgs
  >(FETCH_CHAT_ROOMS, {
    variables: {
      dogId: userInfo?.dog.id || "",
    },
  });

  console.log("ChatRoomList", chatRoomListData?.fetchChatRooms);

  return <ChatListUI chatList={chatRoomListData?.fetchChatRooms} />;
}
