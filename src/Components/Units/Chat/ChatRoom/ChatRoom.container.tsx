import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";

import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";

import {
  IChatMessage,
  IChatRoom,
  IDog,
  IInterestChatMessage,
  IInterestChatRoom,
  Maybe,
} from "../../../../Commons/Types/Generated/types";

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

interface IChatRoomContainerProps {
  isGroupChat: boolean;
  chatRoomData?: IChatRoom | IInterestChatRoom | undefined;
  pairDogData?: IDog | undefined;
  messagesData?: IChatMessage[] | IInterestChatMessage[] | undefined;
  refetch?: () => void;
}

export default function ChatRoomContainer({
  isGroupChat,
  chatRoomData,
  pairDogData,
  messagesData,
  refetch,
}: IChatRoomContainerProps) {
  const router = useRouter();
  const roomId = String(router.query.roomId);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userInfo] = useRecoilState(userInfoState);

  const socket = useMemo(() => {
    return io("https://recipemaker.shop/dangderchats", {
      transports: ["websocket", "polling"],
    });
  }, []);

  useEffect(() => {
    refetch && refetch();

    handleOnMessage();
    handleEmitConnect();
  }, []);

  useEffect(() => {
    if (!messagesData) return;

    const msgs = messagesData.map((e: IChatMessage | IInterestChatMessage) => {
      const { message, lat, lng, meetAt, type } = e;
      const dog = e.senderId.includes(userInfo?.dog?.id || "undefined")
        ? {
            id: e.senderId,
            neme: userInfo?.dog?.name,
          }
        : {
            id: e.senderId,
            name: pairDogData?.name,
          };

      const messageObj: IMessage = {
        type,
        data: { meetAt, message, lat, lng },
        dog,
      };

      return messageObj;
    });
    setMessages(msgs);
  }, [chatRoomData, pairDogData, messagesData]);

  const handleOnMessage = () => {
    socket.on("message", (payload) => {
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

    const dataObjDefault: IMessageData = {
      message: "",
      lat: 0,
      lng: 0,
      meetAt: "",
    };

    const dataObj: IMessageData = { ...dataObjDefault, ...data };

    socket.emit(isGroupChat ? "sendInterest" : "send", {
      type,
      roomId,
      dog: { id: userInfo?.dog?.id, name: userInfo?.dog?.name },
      data: dataObj,
    });
  };

  return (
    <>
      <ChatRoomUI
        isGroupChat={isGroupChat}
        messages={messages}
        pairDog={pairDogData}
        handleEmitSend={handleEmitSend}
      />
    </>
  );
}
