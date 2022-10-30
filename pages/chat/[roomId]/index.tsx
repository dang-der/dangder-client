import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import {
  IQuery,
  IQueryFetchChatMessagesByChatRoomIdArgs,
  IQueryFetchChatRoomArgs,
  IQueryFetchOneDogArgs,
} from "../../../src/Commons/Types/Generated/types";
import {
  FETCH_CHAT_ROOM,
  FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID,
} from "../../../src/Components/Units/Chat/Chat.queries";
import ChatRoomContainer from "../../../src/Components/Units/Chat/ChatRoom/ChatRoom.container";
import { FETCH_ONE_DOG } from "../../../src/Components/Units/Detail/DogDetail.queries";

export default function ChatRoomPage() {
  const router = useRouter();
  const roomId = String(router.query.roomId);

  const { data: chatRoomData } = useQuery<
    Pick<IQuery, "fetchChatRoom">,
    IQueryFetchChatRoomArgs
  >(FETCH_CHAT_ROOM, { variables: { roomId } });

  const { data: pairDogData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, {
    variables: {
      id: chatRoomData?.fetchChatRoom.chatPairId || "",
    },
  });

  const { data: messagesData, refetch } = useQuery<
    Pick<IQuery, "fetchChatMessagesByChatRoomId">,
    IQueryFetchChatMessagesByChatRoomIdArgs
  >(FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID, {
    variables: {
      chatRoomId: roomId,
    },
  });

  const refetchMessages = () => {
    refetch({ chatRoomId: roomId });
  };

  return (
    <ChatRoomContainer
      isGroupChat={false}
      pairDogData={pairDogData?.fetchOneDog}
      messagesData={messagesData?.fetchChatMessagesByChatRoomId}
      refetch={refetchMessages}
    />
  );
}
