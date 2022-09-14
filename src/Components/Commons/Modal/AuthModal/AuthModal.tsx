import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { authModalVisibleState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import CustomLayoutModal from "../CustomLayoutModal/CustomLayoutModal";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import * as S from "./AuthModal.styles";

export default function AuthModal() {
  const [visible, setVisible] = useRecoilState(authModalVisibleState);

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  return (
    <CustomLayoutModal toggleModalVisible={toggleModal} visible={visible}>
      <S.Wrapper>
        <S.IconWrapper>
          <ErrorRoundedIcon />
        </S.IconWrapper>
        <S.CautionText>
          로그인이 <br />
          필요한 페이지입니다!
        </S.CautionText>
      </S.Wrapper>
    </CustomLayoutModal>
  );
}
