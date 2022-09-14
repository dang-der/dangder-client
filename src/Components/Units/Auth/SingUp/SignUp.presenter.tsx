import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../Commons/Store/Auth/SignUpState";
import { PageController } from "../../../Commons/PageStack/Controller";
import Page from "../../../Commons/PageStack/Page";
import PageStack from "../../../Commons/PageStack/PageStack";
import AuthCodeInputPage from "./Page/AuthCodeInputPage";
import EmailInputPage from "./Page/EmailInputPage";
import PasswordInputPage from "./Page/PasswordInputPage";

import { v4 as uuid } from "uuid"

import * as S from "../../../Commons/PageStack/PageContainer.styles";
import { Modal } from "antd";
import { useRouter } from "next/router";

interface SignUpUIprops {
  handleSignUp: (
    email: string,
    password: string
  ) => Promise<boolean | undefined>;
  handleCreateMailToken: (email: string) => Promise<boolean | undefined>;
  handleVerifyMailToken: (
    email: string,
    code: string
  ) => Promise<boolean | undefined>;
}
export default function SignUpUI({
  handleSignUp,
  handleCreateMailToken,
  handleVerifyMailToken,
}: SignUpUIprops) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputs] = useRecoilState(signUpInputState);
  const router = useRouter();

  const onClickNext = async () => {
    console.log("onClickNext", currentPageIndex);
    console.log("onClickNext", currentPageIndex);

    // 이메일 입력 페이지
    if (currentPageIndex === 0) {
      const result = await handleCreateMailToken(inputs?.email);
      result && setCurrentPageIndex(currentPageIndex + 1);
    }
    // 인증번호 입력 페이지
    if (currentPageIndex === 1) {
      const result = await handleVerifyMailToken(
        inputs?.email,
        inputs?.authenticationCode.join("")
      );
      result && setCurrentPageIndex(currentPageIndex + 1);
    }
    // 비밀번호 입력 페이지
    if (currentPageIndex === 2) {
      const result = await handleSignUp(inputs?.email, inputs?.password);
      console.log("signUp", result);
      result && router.replace("/auth/login");
    }
  };

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
        onClick={onClickNext}
        isActive={inputs.isActiveButton}
      >
        {Object.values(inputs).every((e) => e) ? "완료" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
