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
import { IChatRoomsOutput } from "../../../Commons/Types/Generated/types";
import { useState } from "react";
import DeleteChatRoomModal from "./DeleteChatRoomModal/DeleteChatRoomModal";

interface ChatListUIProps {
  chatList: IChatRoomsOutput[] | undefined;
  handleDeleteChatRoom: (roomId: string) => void;
}
export default function ChatListUI({
  chatList,
  handleDeleteChatRoom,
}: ChatListUIProps) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletedRoomId, setDeletedRoomId] = useState<string>();

  const trailingActions = ({ roomId }: any) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          setDeletedRoomId(roomId);
          setDeleteModalVisible((p) => !p);
        }}
      >
        <S.SwipeMenu backgroundColor="red">
          <S.SwipeContentsWrapper>
            <CloseRoundedIcon />
            <span>매치취소</span>
          </S.SwipeContentsWrapper>
        </S.SwipeMenu>
      </SwipeAction>
    </TrailingActions>
  );

  const onClickDeleteChatRoom = () => {
    if (!deletedRoomId) return;
    handleDeleteChatRoom(deletedRoomId);
    setDeleteModalVisible(false);
  };

  return (
    <>
      {deleteModalVisible && (
        <DeleteChatRoomModal
          visible={deleteModalVisible}
          setVisible={setDeleteModalVisible}
          onClickDeleteChatRoom={onClickDeleteChatRoom}
        />
      )}
      <S.Wrapper>
        <S.ChatListContainer>
          <SwipeableList fullSwipe={false} threshold={0.5} type={ListType.IOS}>
            {(chatList || []).map((e: IChatRoomsOutput) => {
              return (
                <SwipeableListItem
                  trailingActions={trailingActions({ roomId: e.id || "" })}
                  key={uuid()}
                >
                  <ChatListItem room={e} />
                </SwipeableListItem>
              );
            })}
          </SwipeableList>
        </S.ChatListContainer>
      </S.Wrapper>
    </>
  );
}
