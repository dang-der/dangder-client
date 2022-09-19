import { Dispatch, MouseEvent, SetStateAction } from "react";
import CustomLayoutModal from "../CustomLayoutModal/CustomLayoutModal";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import * as S from "./ErrorModal.styles";

interface ErrorModalProps {
  title: string;
  subTitle?: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
export default function ErrorModal({
  title,
  subTitle,
  visible,
  setVisible,
}: ErrorModalProps) {
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

        <S.CautionText dangerouslySetInnerHTML={{ __html: title }} />

        <S.SubCautionText
          dangerouslySetInnerHTML={{ __html: subTitle || "" }}
        />
      </S.Wrapper>
    </CustomLayoutModal>
  );
}
