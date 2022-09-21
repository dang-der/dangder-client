
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";
import {
  
  IChatRoomsOutput,
} from "../../../../Commons/Types/Generated/types";


import * as S from "./ChatRoomItem.styles";

interface ChatListItemContainerProps {
  room: IChatRoomsOutput;
}
export default function ChatListItemContainer({
  room,
}: ChatListItemContainerProps) {
  const router = useRouter();

  const [, setEnterRoomInfo] = useRecoilState(enteredChatRoomInfoState);

  const handleClickItem = () => {
    setEnterRoomInfo(room);

    router.push(`/chat/${String(room?.id || "")}`);
  };

  console.log("Rooms", room);
  return (
    <S.Wrapper onClick={handleClickItem}>
      <S.DogImage
        src={"https://storage.googleapis.com/" + room.chatPairDog?.img?.[0].img}
      />
      <S.ContentsWrapper>
        <S.AnotherDogName>{room.chatPairDog?.name}</S.AnotherDogName>
        <S.Message>
          {room.lastMessage?.type === "text"
            ? room.lastMessage.message
            : room.lastMessage?.type === "plan"
            ? "약속이 공유되었습니다."
            : room.lastMessage?.type === "place"
            ? "장소가 공유되었습니다."
            : "매칭된 댕댕이와 대화를 나눠보세요!"}
        </S.Message>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
