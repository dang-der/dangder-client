import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../Commons/Store/Auth/SignUpState";
import Page from "../../../Commons/PageStack/Page";
import PageStack from "../../../Commons/PageStack/PageStack";
import AuthCodeInputPage from "./Page/AuthCodeInputPage";
import EmailInputPage from "./Page/EmailInputPage";
import PasswordInputPage from "./Page/PasswordInputPage";

import * as S from "./SignUp.styles";
interface ControllerType {
  next: () => void;
  prev: () => void;
}
export default function SignUpUI() {
  const [inputs] = useRecoilState(signUpInputState);

  useEffect(() => {
    console.log("signupInput", inputs);
  }, [inputs]);

  const controller = useRef<ControllerType>({
    next: () => {},
    prev: () => {},
  });

  const onClickNext = () => {
    if (!inputs.isActiveButton) return;
    controller?.current.next();
  };

  const onClickPrev = () => {
    controller?.current.prev();
  };

  return (
    <S.Wrapper>
      <S.PageStackWrapper>
        <PageStack controller={controller}>
          <Page>
            <EmailInputPage />
          </Page>
          <Page>
            <AuthCodeInputPage />
          </Page>
          <Page>
            <PasswordInputPage />
          </Page>
        </PageStack>
      </S.PageStackWrapper>

      <S.NextButton onClick={onClickNext} isActive={inputs.isActiveButton}>
        {Object.values(inputs).every((e) => e) ? "완료" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
