import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchIChatMessagesByIChatRoomIdArgs,
  IQueryFetchInterestChatRoomArgs,
} from "../../../../src/Commons/Types/Generated/types";
import {
  FETCH_ICHAT_MESSAGES_BY_ICHAT_ROOM_ID,
  FETCH_INTEREST_CHAT_ROOM,
} from "../../../../src/Components/Units/Chat/Chat.queries";
import ChatRoomContainer from "../../../../src/Components/Units/Chat/ChatRoom/ChatRoom.container";

export default function InterestGroupChatRoomPage() {
  const router = useRouter();
  const roomId = String(router.query.roomId);

  const { data: chatRoomData } = useQuery<
    Pick<IQuery, "fetchInterestChatRoom">,
    IQueryFetchInterestChatRoomArgs
  >(FETCH_INTEREST_CHAT_ROOM, { variables: { iRoomId: roomId } });

  const { data: messagesData, refetch } = useQuery<
    Pick<IQuery, "fetchIChatMessagesByIChatRoomId">,
    IQueryFetchIChatMessagesByIChatRoomIdArgs
  >(FETCH_ICHAT_MESSAGES_BY_ICHAT_ROOM_ID, {
    variables: {
      iChatRoomId: roomId,
    },
  });

  const refetchMessages = () => {
    refetch({ iChatRoomId: roomId });
  };

  return (
    <ChatRoomContainer
      isGroupChat={true}
      chatRoomData={chatRoomData?.fetchInterestChatRoom}
      messagesData={messagesData?.fetchIChatMessagesByIChatRoomId}
      refetch={refetchMessages}
    />
  );
}
