import { v4 as uuid } from "uuid";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import * as S from "./ChatRoomList.styles";
import ChatListItem from "./ChatRoomItem/ChatRoomItem";

interface ChatListUIProps {
  chatList: any;
}
export default function ChatListUI({ chatList }: ChatListUIProps) {
  const onClickMatchCancel = () => {
    console.log("onClickMatchCancel");
  };

  const onClickReport = () => {
    console.log("onClickReport");
  };

  // todo : 채팅방 아이디 받기
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={onClickReport}>
        <S.SwipeMenu backgroundColor="pink">신고하기</S.SwipeMenu>
      </SwipeAction>
      <SwipeAction onClick={onClickMatchCancel}>
        <S.SwipeMenu backgroundColor="red">매치취소</S.SwipeMenu>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <S.Wrapper>
      <S.Title>채팅방</S.Title>
      <S.ChatListContainer>
        <SwipeableList fullSwipe={false} threshold={0.5} type={ListType.IOS}>
          {(chatList || []).map((e: any) => {
            return (
              <SwipeableListItem trailingActions={trailingActions()}>
                <ChatListItem item={e} key={uuid()} />
              </SwipeableListItem>
            );
          })}
        </SwipeableList>
      </S.ChatListContainer>
    </S.Wrapper>
  );
}
