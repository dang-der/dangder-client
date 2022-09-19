import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { DimWrapper } from "../CustomLayoutModal/CustomLayoutModal";
import ani_loading from "../../../../../public/ani_loading.json";
import Lottie from "lottie-react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LottieWrapper = styled.div`
  width: 50%;
`;
interface LoadingModalProps {
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

export default function LoadingModal({ setVisible }: LoadingModalProps) {
  // const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
  //   if (!setVisible) return;

  //   if (typeof visible === "boolean") {
  //     setVisible(visible);
  //     return;
  //   }
  //   if (!visible) setVisible((p) => !p);
  // };

  return (
    <DimWrapper>
      <Wrapper>
        <LottieWrapper>
          <Lottie animationData={ani_loading} loop={true} />
        </LottieWrapper>
        <span style={{ color: "#FFFFFF" }}>loading...</span>
      </Wrapper>
    </DimWrapper>
  );
}
