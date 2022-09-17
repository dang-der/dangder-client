import { useApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import { socket } from "../../../../Commons/Socket";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";

import {
  IChatMessage,
  IDog,
  IQuery,
  IQueryFetchChatMessagesByChatRoomIdArgs,
  IQueryFetchOneDogArgs,
  Maybe,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_LOGIN_USER } from "../../Auth/Login/Login.queries";
import {
  FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID,
  FETCH_ONE_DOG,
} from "../Chat.queries";
import ChatRoomUI from "./ChatRoom.presenter";

export interface IInfo {
  userId: string;
  dog: {
    id: string;
    name: string;
  };
}

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

  const [info, setInfo] = useState<IInfo | undefined>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [enterRoomInfo] = useRecoilState(enteredChatRoomInfoState);
  const [user] = useRecoilState(userInfoState);

  const { data: messagesData } = useQuery<
    Pick<IQuery, "fetchChatMessagesByChatRoomId">,
    IQueryFetchChatMessagesByChatRoomIdArgs
  >(FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID, {
    variables: {
      chatRoomId: String(router.query.roomId),
    },
  });

  useEffect(() => {
    handleOnMessage();
    handleEmitConnect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!messagesData?.fetchChatMessagesByChatRoomId) return;

    messagesData.fetchChatMessagesByChatRoomId.forEach((e: IChatMessage) => {
      const { message, lat, lng, meetAt, type } = e;
      const dog =
        e.senderId === enterRoomInfo?.pairInfo.id
          ? { id: enterRoomInfo.pairInfo.id, neme: enterRoomInfo.pairInfo.name }
          : { id: user?.dog.id, name: user?.dog.name };

      const messageObj: IMessage = {
        type,
        data: { meetAt, message, lat, lng },
        dog,
      };
      setMessages((p) => [...p, messageObj]);
    });
  }, [messagesData]);

  console.log(messagesData);
  const handleOnMessage = () => {
    socket.on("message", (payload) => {
      console.log("socketOn - message", payload);
      setMessages((p) => [...p, payload]);
    });
  };

  const handleEmitConnect = async () => {
    if (!user) return;

    const { id, name } = user?.dog;

    setInfo({
      userId: user.id,
      dog: {
        id,
        name,
      },
    });

    socket.emit("join", {
      roomId,
      dog: { id, name },
    });
  };

  const handleEmitSend = ({ type, data }: { type: string; data: any }) => {
    console.log("handleEmitSend", type, data);
    if (!info) return;

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
      dog: { id: info.dog.id, name: info.dog.name },
      data: dataObj,
    });
  };

  return (
    <ChatRoomUI
      handleEmitSend={handleEmitSend}
      messages={messages}
      myInfo={info}
    />
  );
}
