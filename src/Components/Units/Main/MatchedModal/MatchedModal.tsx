import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Lottie from "lottie-react";

import { matchedModalVisibleState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import BlueButton from "../../../Commons/Button/BlueButton";
import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import * as S from "./MatchedModal.styles";
import ani_matched from "../../../../../public/ani_matched.json";

export default function MatchedModal() {
  const [visible, setVisible] = useRecoilState(matchedModalVisibleState);

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  const onClickChat = () => {};

  return (
    <>
      {visible && (
        <DimWrapper>
          <S.CloseIconWrapper onClick={toggleModal}>
            <CloseRoundedIcon />
          </S.CloseIconWrapper>
          <S.Wrapper>
            <S.DogImageWrapper>
              <Lottie animationData={ani_matched} loop={true} />
              <S.DogImage />
            </S.DogImageWrapper>

            <span>
              매칭 성공!
              <br />
              오전이님과 대화해보세요!
            </span>

            <BlueButton
              title="채팅하기"
              onClick={() => {}}
              style={{ width: "12.5rem", marginTop: "5rem", fontSize: "1rem" }}
            />
          </S.Wrapper>
        </DimWrapper>
      )}
    </>
  );
}
