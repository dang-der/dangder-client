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

interface SignUpUIprops{
  handleSignUp : (email: string, password: string) => Promise<boolean | undefined>
  handleCreateMailToken :(email : string) => Promise<boolean | undefined>
  handleVerifyMailToken : (email: string, code: string) => Promise<boolean | undefined>
}
export default function SignUpUI({handleSignUp, handleCreateMailToken, handleVerifyMailToken} : SignUpUIprops) {

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputs, ] = useRecoilState(signUpInputState);

  const onClickNext = async (index: number, currentPageInfo: any, data: any) => {
    console.log('onClickNext', index)
    // 이메일 입력 페이지
    if (index - 1 === 0) {
      console.log('onClickNext', 'emailInput')
      const result = await handleCreateMailToken(data?.email)
      result && setCurrentPageIndex(index)
    }
    // 인증번호 입력 페이지
    if (index - 1 === 1) {
      console.log('onClickNext', 'codeInput')
      const result = await handleVerifyMailToken(data?.email, data?.authenticationCode.join(''))
      result && setCurrentPageIndex(index)
    }
    // 비밀번호 입력 페이지
    if (index - 1 === 2) {
      const result = await handleSignUp(data?.email, data?.password)
      result && setCurrentPageIndex(index)
    }

  };

  const controller = useMemo(() => {
    return new PageController({
      pages: [
          
            <EmailInputPage key={uuid()}/>, 
            <AuthCodeInputPage key={uuid()}/>, 
            <PasswordInputPage key={uuid()}/>
        
        ],
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
