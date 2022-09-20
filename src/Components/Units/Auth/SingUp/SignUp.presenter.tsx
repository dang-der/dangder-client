import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Page from "../../../Commons/PageStack/Page";
import PageStack from "../../../Commons/PageStack/PageStack";
import AuthCodeInputPage from "./Page/AuthCodeInputPage";
import EmailInputPage from "./Page/EmailInputPage";
import PasswordInputPage from "./Page/PasswordInputPage";

import * as S from "../../../Commons/PageStack/PageContainer.styles";

import RegistrationNumberInputPage from "./Page/RegistrationNumberInputPage";

import ProfileInput2Page from "./Page/ProfileInput2Page";
import { useRecoilState } from "recoil";
import { verifyErrorState } from "../../../../Commons/Store/Auth/SignUpState";
import ProfileInputPage from "./Page/ProfileInputPage";
import { IQuery } from "../../../../Commons/Types/Generated/types";

interface SignUpUIprops {
  currentPageIndex: number;
  handlePrevPage: () => void;
  handleCreateMailToken: () => void;
  handleVerifyMailToken: () => void;
  handleCheckPassword: () => void;
  handleCheckDogRegisterNumber: () => void;
  handleProfileInput: () => void;
  handleCreateUserAndDog: () => void;
  charactersData: Pick<IQuery, "fetchCharacters"> | undefined;
  interestsData: Pick<IQuery, "fetchInterests"> | undefined;
  avoidBreedsData: Pick<IQuery, "fetchAvoidBreeds"> | undefined;
}
export default function SignUpUI({
  currentPageIndex,
  handlePrevPage,
  handleCreateMailToken,
  handleVerifyMailToken,
  handleCheckPassword,
  handleCheckDogRegisterNumber,
  handleProfileInput,
  handleCreateUserAndDog,
  charactersData,
  interestsData,
  avoidBreedsData,
}: SignUpUIprops) {
  const [verifyError] = useRecoilState(verifyErrorState);
  const onClickNext = () => {
    if (currentPageIndex === 0) {
      handleCreateMailToken();
      return;
    }

    if (currentPageIndex === 1) {
      handleVerifyMailToken();
      return;
    }

    if (currentPageIndex === 2) {
      handleCheckPassword();
      return;
    }

    if (currentPageIndex === 3) {
      handleCheckDogRegisterNumber();
      return;
    }

    if (currentPageIndex === 4) {
      handleProfileInput();
      return;
    }

    handleCreateUserAndDog();
  };

  return (
    <S.Wrapper>
      <S.Header>
        <ArrowBackRoundedIcon onClick={handlePrevPage} />
        <span>회원가입</span>
      </S.Header>
      <S.PageStackWrapper>
        <PageStack currentPageIndex={currentPageIndex}>
          <Page>
            <EmailInputPage />
          </Page>

          <Page>
            <AuthCodeInputPage verifyError={verifyError} />
          </Page>

          <Page>
            <PasswordInputPage />
          </Page>

          <Page>
            <RegistrationNumberInputPage />
          </Page>

          <Page>
            <ProfileInputPage />
          </Page>

          <Page>
            <ProfileInput2Page
              interests={interestsData?.fetchInterests}
              characters={charactersData?.fetchCharacters}
              avoidBreeds={avoidBreedsData?.fetchAvoidBreeds}
            />
          </Page>
        </PageStack>
      </S.PageStackWrapper>

      <S.NextButton type="button" onClick={onClickNext}>
        {currentPageIndex === 5 ? "가입" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
