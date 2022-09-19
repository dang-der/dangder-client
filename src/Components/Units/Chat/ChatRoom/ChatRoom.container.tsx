import {  useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect,  useState } from "react";
import { useRecoilState } from "recoil";

import { socket } from "../../../../Commons/Socket";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";

import {
  IChatMessage,
  
  IQuery,
  IQueryFetchChatMessagesByChatRoomIdArgs,
  
  Maybe,
} from "../../../../Commons/Types/Generated/types";

import {
  FETCH_CHAT_MESSAGES_BY_CHAT_ROOM_ID,
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

  console.log("ChatRoomContainer", messagesData);

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
      console.log("fetchChatMessage", e);
      const { message, lat, lng, meetAt, type } = e;
      const dog =
        e.senderId === enterRoomInfo?.chatPairDog?.id
          ? {
              id: enterRoomInfo.chatPairDog.id,
              neme: enterRoomInfo.chatPairDog.name,
            }
          : { id: enterRoomInfo?.dog?.id, name: enterRoomInfo?.dog?.name };

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
