import { v4 as uuid } from "uuid";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import * as S from "./ChatRoomList.styles";
import ChatListItem from "./ChatRoomItem/ChatRoomItem";

interface ChatListUIProps {
  chatList: any;
}
export default function ChatListUI({ chatList }: ChatListUIProps) {
  const onClickMatchCancel = () => {
    console.log("onClickMatchCancel");
  };

  // todo : 채팅방 아이디 받기
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={onClickMatchCancel}>
        <S.SwipeMenu backgroundColor="red">
          <S.SwipeContentsWrapper>
            <CloseRoundedIcon />
            <span>매치취소</span>
          </S.SwipeContentsWrapper>
        </S.SwipeMenu>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <S.Wrapper>
      <S.ChatListContainer>
        <SwipeableList fullSwipe={false} threshold={0.5} type={ListType.IOS}>
          {(chatList || []).map((e: any) => {
            return (
              <SwipeableListItem
                trailingActions={trailingActions()}
                key={uuid()}
              >
                <ChatListItem item={e} />
              </SwipeableListItem>
            );
          })}
        </SwipeableList>
      </S.ChatListContainer>
    </S.Wrapper>
  );
}
