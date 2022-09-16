import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { socket } from "../../../../Commons/Socket";

import { placeMessageState } from "../../../../Commons/Store/Chat/Chat";
import { IDog, IQuery } from "../../../../Commons/Types/Generated/types";
import { FETCH_LOGIN_USER } from "../../Auth/Login/Login.queries";
import ChatRoomUI from "./ChatRoom.presenter";

export interface IInfo {
  userId: string;
  dog: {
    id: string;
    name: string;
  };
}

export interface IMessageData {
  message: string;
  lat: number;
  lng: number;
  meetAt: string;
}

export interface IMessage {
  type: string;
  data: IMessageData;
  dog: { id: string; name: string };
}

export default function ChatRoomContainer() {
  const router = useRouter();
  const roomId = router.query.roomId;
  const client = useApolloClient();

  const [info, setInfo] = useState<IInfo | undefined>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    handleOnMessage();
    handleEmitConnect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOnMessage = () => {
    socket.on("message", (payload) => {
      console.log("socketOn - message", payload);
      setMessages((p) => [...p, payload]);
    });
  };

  const handleEmitConnect = async () => {
    const { data: user } = await client.query<Pick<IQuery, "fetchLoginUser">>({
      query: FETCH_LOGIN_USER,
    });

    const { id, name } = user.fetchLoginUser.dog;

    setInfo({
      userId: user.fetchLoginUser.id,
      dog: {
        id: user.fetchLoginUser.dog.id,
        name: user.fetchLoginUser.dog.name,
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
