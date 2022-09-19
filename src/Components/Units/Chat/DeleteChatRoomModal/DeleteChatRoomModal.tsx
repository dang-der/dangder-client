import { Dispatch, SetStateAction, MouseEvent } from "react";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import CustomLayoutModal from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import * as S from "./DeleteChatRoomModal.style";

interface DeleteChatRoomModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onClickDeleteChatRoom: () => void;
}
export default function DeleteChatRoomModal({
  visible,
  setVisible,
  onClickDeleteChatRoom,
}: DeleteChatRoomModalProps) {
  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  return (
    <CustomLayoutModal visible={visible} toggleModalVisible={toggleModal}>
      <S.Wrapper>
        <S.IconWrapper>
          <ErrorRoundedIcon />
        </S.IconWrapper>

        <S.CautionText>채팅방 나가기</S.CautionText>
        <S.SubCautionText>
          나가기를 하면 대화내용이 모두 삭제되고, <br />
          채팅목록에서도 삭제 됩니다.
        </S.SubCautionText>

        <S.ButtonWrapper onClick={onClickDeleteChatRoom}>
          나가기
        </S.ButtonWrapper>
      </S.Wrapper>
    </CustomLayoutModal>
  );
}
