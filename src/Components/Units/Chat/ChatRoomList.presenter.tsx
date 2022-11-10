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
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";

import * as S from "./ChatRoomList.styles";
import ChatListItem from "./ChatRoomItem/ChatRoomItem";
import { IChatRoomsOutput } from "../../../Commons/Types/Generated/types";
import { useState } from "react";
import DeleteChatRoomModal from "./DeleteChatRoomModal/DeleteChatRoomModal";

interface ChatListUIProps {
  chatList: IChatRoomsOutput[] | undefined;
  handleDeleteChatRoom: (roomId: string) => void;
  handleReportUser: (targetDogId: string) => void;
}
export default function ChatListUI({
  chatList,
  handleDeleteChatRoom,
  handleReportUser,
}: ChatListUIProps) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletedRoomId, setDeletedRoomId] = useState<string>();

  const trailingActions = (room: IChatRoomsOutput) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          setDeletedRoomId(String(room.id));
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

      <SwipeAction
        onClick={() => {
          if (!room.id) return;
          handleDeleteChatRoom(room.id);
          handleReportUser(String(room.chatPairDog?.id));
        }}
      >
        <S.SwipeMenu backgroundColor="gray">
          <S.SwipeContentsWrapper>
            <ReportProblemRoundedIcon />
            <span>신고하기</span>
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
          <SwipeableList type={ListType.IOS} threshold={0.3}>
            {(chatList || []).map((e: IChatRoomsOutput) => {
              return (
                <SwipeableListItem
                  trailingActions={trailingActions(e)}
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
