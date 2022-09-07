import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../Commons/Store/Auth/SignUpState";
import { PageController } from "../../../Commons/PageStack/Controller";
import Page from "../../../Commons/PageStack/Page";
import PageStack from "../../../Commons/PageStack/PageStack";
import AuthCodeInputPage from "./Page/AuthCodeInputPage";
import EmailInputPage from "./Page/EmailInputPage";
import PasswordInputPage from "./Page/PasswordInputPage";

import * as S from "./SignUp.styles";

export default function SignUpUI() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputs] = useRecoilState(signUpInputState);

  const onClickNext = (index: number, currentPageInfo: any, data: any) => {
    if (!data.isActiveButton) return;
    setCurrentPageIndex(index);
  };

  const controller = useMemo(() => {
    return new PageController({
      pages: Array(3)
        .fill(0)
        .map((e, i) => (
          <Page key={i}>
            <EmailInputPage />
          </Page>
        )),
      onClickNext,
    });
  }, []);

  return (
    <S.Wrapper>
      <S.PageStackWrapper>
        <PageStack currentPageIndex={currentPageIndex}>
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

      <S.NextButton
        type="button"
        onClick={() => controller.nextPage(inputs)}
        isActive={inputs.isActiveButton}
      >
        {Object.values(inputs).every((e) => e) ? "완료" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
