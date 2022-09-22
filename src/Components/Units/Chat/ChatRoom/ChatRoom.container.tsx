import {  useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";

import { socket } from "../../../../Commons/Socket";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";

import {
  IChatMessage,
  IQuery,
  IQueryFetchChatMessagesByChatRoomIdArgs,
  IQueryFetchChatRoomArgs,
  IQueryFetchOneDogArgs,
  Maybe,
} from "../../../../Commons/Types/Generated/types";

import {
  FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID,
  FETCH_CHAT_ROOM,
  FETCH_ONE_DOG,
} from "../Chat.queries";
import ChatRoomUI from "./ChatRoom.presenter";

export interface IMessageData {
  message?: string | Maybe<string> | undefined;
  lat?: number | Maybe<number> | undefined;
  lng?: number | Maybe<number> | undefined;
  meetAt?: string | Maybe<string> | undefined;
}

export interface IMessage {
  type?: string;
  data?: IMessageData;
  dog?: { id?: string | undefined; name?: string | undefined };
}

export default function ChatRoomContainer() {
  const router = useRouter();
  const roomId = String(router.query.roomId);

  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [enterRoomInfo] = useRecoilState(enteredChatRoomInfoState);
  const [userInfo] = useRecoilState(userInfoState);

  const { data: chatRoomData } = useQuery<
    Pick<IQuery, "fetchChatRoom">,
    IQueryFetchChatRoomArgs
  >(FETCH_CHAT_ROOM, { variables: { roomId } });

  const { data: pairDogData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, {
    variables: { id: chatRoomData?.fetchChatRoom.chatPairId || "" },
  });

  const { data: messagesData, refetch } = useQuery<
    Pick<IQuery, "fetchChatMessagesByChatRoomId">,
    IQueryFetchChatMessagesByChatRoomIdArgs
  >(FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID, {
    variables: {
      chatRoomId: roomId,
    },
  });

  const socket = useMemo(() => {
    return io("https://recipemaker.shop/dangderchats", {
      // forceNew: true,
      transports: ["websocket", "polling"],
      // timeout: 1000 * 60,
    });
  }, []);

  console.log("ChatRoomContainer", messagesData);

  useEffect(() => {
    refetch({ chatRoomId: String(router.query.roomId) });

    handleOnMessage();
    handleEmitConnect();
  }, []);

  useEffect(() => {
    if (!messagesData?.fetchChatMessagesByChatRoomId) return;

    console.log("messagesData is update", messagesData);
    const msgs = messagesData.fetchChatMessagesByChatRoomId.map(
      (e: IChatMessage) => {
        const { message, lat, lng, meetAt, type } = e;
        console.log("메세지 데이터", e);
        const dog = e.senderId.includes(userInfo?.dog?.id || "undefined")
          ? {
              id: e.senderId,
              neme: userInfo?.dog?.name,
            }
          : {
              id: e.senderId,
              name: pairDogData?.fetchOneDog?.name,
            };

        const messageObj: IMessage = {
          type,
          data: { meetAt, message, lat, lng },
          dog,
        };

        return messageObj;
      }
    );
    setMessages(msgs);
  }, [chatRoomData, pairDogData, messagesData]);

  const handleOnMessage = () => {
    socket.on("message", (payload) => {
      console.log("socketOn - message", payload);
      setMessages((p) => [...p, payload]);
    });
  };

  const handleEmitConnect = async () => {
    if (!userInfo?.dog) return;

    const { id, name } = userInfo?.dog;

    socket.emit("join", {
      roomId,
      dog: { id, name },
    });
  };

  const handleEmitSend = ({ type, data }: { type: string; data: any }) => {
    if (!userInfo) return;
    console.log("handleEmitSend", type, data);

    const dataObjDefault: IMessageData = {
      message: "",
      lat: 0,
      lng: 0,
      meetAt: "",
    };

    const dataObj: IMessageData = { ...dataObjDefault, ...data };

    socket.emit("send", {
      type,
      roomId,
      dog: { id: userInfo?.dog?.id, name: userInfo?.dog?.name },
      data: dataObj,
    });
  };

  return (
    <>
      <ChatRoomUI
        handleEmitSend={handleEmitSend}
        messages={messages}
        pairDog={pairDogData}
        roomData={chatRoomData}
      />
    </>
  );
}
