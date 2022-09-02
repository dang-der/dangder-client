import { useRouter } from "next/router";
import * as S from "./ChatRoomItem.styles";

interface ChatListItemContainerProps {
  item: any;
}
export default function ChatListItemContainer({
  item,
}: ChatListItemContainerProps) {
  const router = useRouter();

  const handleClickItem = () => {
    router.push(`/chat/${item.roomId}`);
  };

  return (
    <S.Wrapper onClick={handleClickItem}>
      <S.DogImage src="/favicon.ico" />
      <S.ContentsWrapper>
        <S.AnotherDogName>강아지 이름</S.AnotherDogName>
        <S.Message>마지막 메세지 내용</S.Message>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
