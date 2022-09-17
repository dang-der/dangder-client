import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";
import {
  IChatRoom,
  IChatRoomsOutput,
  IQuery,
  IQueryFetchOneDogArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_ONE_DOG } from "../Chat.queries";

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

  return (
    <S.Wrapper onClick={handleClickItem}>
      {/* <S.DogImage
        src={"https://storage.googleapis.com/" + room.chatPairDog?.img[0].img}
      /> */}
      <S.ContentsWrapper>
        <S.AnotherDogName>{room.chatPairDog?.name}</S.AnotherDogName>
        <S.Message>마지막 메세지 내용</S.Message>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
