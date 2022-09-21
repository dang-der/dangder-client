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
  Maybe,
} from "../../../../Commons/Types/Generated/types";

import { FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID } from "../Chat.queries";
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
  const roomId = router.query.roomId;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [enterRoomInfo] = useRecoilState(enteredChatRoomInfoState);
  const [userInfo] = useRecoilState(userInfoState);

  const { data: messagesData, refetch } = useQuery<
    Pick<IQuery, "fetchChatMessagesByChatRoomId">,
    IQueryFetchChatMessagesByChatRoomIdArgs
  >(FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID, {
    variables: {
      chatRoomId: String(router.query.roomId),
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
    console.log("chatRoom", "refetch", messagesData);
    handleOnMessage();
    handleEmitConnect();

    socket.on("connection", (data) => {
      console.log("socket - connection", data);
    });

    socket.on("connect_error", (error) => {
      console.log("socketError", error);
    });

    // client-side
    socket.on("connect", () => {
      console.log("socketConnect", socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", (_data) => {
      socket.connect();
      console.log("socketDisConnect", _data); // x8WIv7-mJelg7on_ALbx
    });
  }, []);

  useEffect(() => {
    if (!messagesData?.fetchChatMessagesByChatRoomId) return;

    console.log("messagesData is update", messagesData);
    messagesData.fetchChatMessagesByChatRoomId.forEach((e: IChatMessage) => {
      if (!enterRoomInfo || !userInfo) return;

      const { message, lat, lng, meetAt, type } = e;
      const dog = e.senderId.includes(
        String(enterRoomInfo?.chatPairDog?.id || "")
      )
        ? {
            id: enterRoomInfo?.chatPairDog?.id,
            neme: enterRoomInfo?.chatPairDog?.name,
          }
        : { id: userInfo?.dog?.id || "", name: userInfo?.dog?.name || "" };

      const messageObj: IMessage = {
        type,
        data: { meetAt, message, lat, lng },
        dog,
      };

      setMessages((p) => [...p, messageObj]);
    });
  }, [messagesData]);

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
      {enterRoomInfo && messagesData && (
        <ChatRoomUI handleEmitSend={handleEmitSend} messages={messages} />
      )}
    </>
  ); 
}
