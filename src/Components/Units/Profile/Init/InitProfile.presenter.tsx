import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Page from "../../../Commons/PageStack/Page";
import * as S from "../../../Commons/PageStack/PageContainer.styles";
import PageStack from "../../../Commons/PageStack/PageStack";

import { IQuery } from "../../../../Commons/Types/Generated/types";

import RegistrationNumberInputPage from "../../Auth/SingUp/Page/RegistrationNumberInputPage";
import ProfileInputPage from "../../Auth/SingUp/Page/ProfileInputPage";
import ProfileInput2Page from "../../Auth/SingUp/Page/ProfileInput2Page";

interface InitProfileUIProps {
  currentPageIndex: number;
  handlePrevPage: () => void;
  handleCheckDogRegisterNumber: () => void;
  handleProfileInput: () => void;
  handleCreateDog: () => void;
  charactersData: Pick<IQuery, "fetchCharacters"> | undefined;
  interestsData: Pick<IQuery, "fetchInterestCategory"> | undefined;
}

export default function InitProfileUI({
  currentPageIndex,
  handlePrevPage,
  handleCheckDogRegisterNumber,
  handleCreateDog,
  handleProfileInput,
  charactersData,
  interestsData,
}: InitProfileUIProps) {
  const onClickNext = () => {
    if (currentPageIndex === 0) {
      handleCheckDogRegisterNumber();
      return;
    }

    if (currentPageIndex === 1) {
      handleProfileInput();
      return;
    }

    handleCreateDog();
  };
  return (
    <S.Wrapper>
      <S.Header>
        <ArrowBackRoundedIcon onClick={handlePrevPage} />
      </S.Header>
      <S.PageStackWrapper>
        <PageStack currentPageIndex={currentPageIndex}>
          <Page>
            <RegistrationNumberInputPage />
          </Page>

          <Page>
            <ProfileInputPage />
          </Page>

          <Page>
            <ProfileInput2Page
              interests={interestsData?.fetchInterestCategory}
              characters={charactersData?.fetchCharacters}
            />
          </Page>
        </PageStack>
      </S.PageStackWrapper>

      <S.NextButton type="button" onClick={onClickNext}>
        {currentPageIndex === 2 ? "댕댕이 등록" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
