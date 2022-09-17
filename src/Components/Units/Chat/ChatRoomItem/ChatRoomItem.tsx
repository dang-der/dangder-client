import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";
import {
  IChatRoom,
  IQuery,
  IQueryFetchOneDogArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_ONE_DOG } from "../Chat.queries";

import * as S from "./ChatRoomItem.styles";

interface ChatListItemContainerProps {
  room: IChatRoom;
}
export default function ChatListItemContainer({
  room,
}: ChatListItemContainerProps) {
  const router = useRouter();

  const [, setEnterRoomInfo] = useRecoilState(enteredChatRoomInfoState);

  const { data: anotherDogData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, {
    variables: { id: room.chatPairId },
  });

  console.log("ChatListItem", anotherDogData);

  const handleClickItem = () => {
    if (!anotherDogData) return;

    setEnterRoomInfo({
      roomInfo: room,
      pairInfo: anotherDogData?.fetchOneDog,
    });

    router.push(`/chat/${room.id}`);
  };

  return (
    <S.Wrapper onClick={handleClickItem}>
      <S.DogImage
        src={
          "https://storage.googleapis.com/" +
          anotherDogData?.fetchOneDog.img[0].img
        }
      />
      <S.ContentsWrapper>
        <S.AnotherDogName>{anotherDogData?.fetchOneDog.name}</S.AnotherDogName>
        <S.Message>마지막 메세지 내용</S.Message>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
