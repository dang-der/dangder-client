import { useRouter } from "next/router";
import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import * as S from "./NonmemberModal.styles";
import { useRecoilState } from "recoil";
import { nonmemberModalVisible } from "../../../../Commons/Store/Modal/ModalVisibleState";
import styled from "@emotion/styled";

interface NonmemberModalProps {
  dogImageUrl?: string;
}

const DeepDimWrapper = styled(DimWrapper)`
  background-color: #000000e5;
`;

export default function NonmemberModal({ dogImageUrl }: NonmemberModalProps) {
  const router = useRouter();
  const [visible, setVisible] = useRecoilState(nonmemberModalVisible);

  const onClickMoveToSignUP = () => {
    router.push("/auth/signup");
  };

  const onClickClose = () => {
    console.log("onClickClose", visible);
    router.replace("/");
    setVisible(false);
  };

  const onClickMoveToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <DeepDimWrapper>
        <S.CloseIconWrapper onClick={onClickClose}>
          <CloseRoundedIcon />
        </S.CloseIconWrapper>
        <S.Wrapper>
          <S.DogImageWrapper src={dogImageUrl || "/pug.jpg"} />
          <span>
            이 댕댕이에 대해 자세히 알고 싶으시면
            <br />
            댕더 계정을 만들어 보세요!
          </span>

          <span onClick={onClickMoveToSignUP}>
            <u>댕더 계정 만들러 가기 👉🏻</u>
          </span>
          <span onClick={onClickMoveToLogin} style={{ marginTop: "1rem" }}>
            <u>로그인 👉🏻</u>
          </span>
        </S.Wrapper>
      </DeepDimWrapper>
    </>
  );
}
