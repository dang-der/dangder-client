import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { DimWrapper } from "../CustomLayoutModal/CustomLayoutModal";
import ani_like_button from "../../../../../public/ani_like_button.json";
import Lottie from "lottie-react";
import { useRouter } from "next/router";

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
interface LikeModalProps {
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  handleCompleteAnimation: () => void;
}

export default function LikeModal({ handleCompleteAnimation }: LikeModalProps) {
  const router = useRouter();
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
          <Lottie
            animationData={ani_like_button}
            loop={false}
            onComplete={() => {
              handleCompleteAnimation();
            }}
          />
        </LottieWrapper>
        <span style={{ color: "#FFFFFF" }}></span>
      </Wrapper>
    </DimWrapper>
  );
}
