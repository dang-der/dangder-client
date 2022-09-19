import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import CustomLayoutModal from "../CustomLayoutModal/CustomLayoutModal";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import * as S from "./AuthModal.styles";

export default function ExceptionModal() {
  const [modalState, setModalState] = useRecoilState(exceptionModalState);

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setModalState((p) => ({ ...p, visible }));
      return;
    }
    if (!visible) setModalState((p) => ({ ...p, visible: !p.visible }));
  };

  return (
    <CustomLayoutModal
      toggleModalVisible={toggleModal}
      visible={modalState.visible}
    >
      <S.Wrapper>
        <S.IconWrapper>
          <ErrorRoundedIcon />
        </S.IconWrapper>
        <S.CautionText
          dangerouslySetInnerHTML={{ __html: modalState.message }}
        />
      </S.Wrapper>
    </CustomLayoutModal>
  );
}
