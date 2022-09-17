import { ReactNode, useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styled from "@emotion/styled";

export const DimWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-288px);
  margin: 0 auto;
  max-width: 576px;
  width: 100%;
  height: 100%;
  background-color: #000000cc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;

  @media screen and (max-width: 576px) {
    left: 0;
    transform: translateX(0);
  }
`;

const ModalWrapper = styled.div`
  background-color: white;
  max-width: 80%;
  min-width: 50%;
  padding: 1.5rem;
  border-radius: 1.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButtonWrapper = styled(CloseRoundedIcon)`
  cursor: pointer;
  align-self: flex-end;
`;
interface CustomLayoutModalProps {
  children: ReactNode;
  visible: boolean;
  toggleModalVisible: (visible: boolean) => void;
}
export default function CustomLayoutModal({
  children,
  visible,
  toggleModalVisible,
}: CustomLayoutModalProps) {
  const [modalVisible, setVisible] = useState(visible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const onClickClose = () => {
    setVisible(false);
    toggleModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <DimWrapper>
          <ModalWrapper>
            <CloseButtonWrapper onClick={onClickClose} />
            {children}
          </ModalWrapper>
        </DimWrapper>
      )}
    </>
  );
}
