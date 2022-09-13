import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { placeMessageState } from "../../../../Commons/Store/Chat/Chat";
import ChatRoomUI from "./ChatRoom.presenter";

export default function ChatRoomContainer() {
  const [placeMessage] = useRecoilState(placeMessageState);

  useEffect(() => {
    console.log("ChatRoomContainer", placeMessage);
  }, [placeMessage]);

  return <ChatRoomUI />;
}
