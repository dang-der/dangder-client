import { useRouter } from "next/router";
import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";

import * as S from "./NonmemberModal.styles";

interface NonmemberModalProps {
  dogImageUrl?: string;
}

export default function NonmemberModal({ dogImageUrl }: NonmemberModalProps) {
  const router = useRouter();
  const onClickMoveToSignUP = () => {
    router.push("/auth/signup");
  };
  return (
    <DimWrapper>
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
      </S.Wrapper>
    </DimWrapper>
  );
}
