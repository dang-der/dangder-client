import { useRef } from "react";
import Page from "../../../Commons/PageStack/Page";
import * as S from "../../../Commons/PageStack/PageContainer.styles";
import PageStack from "../../../Commons/PageStack/PageStack";
import ProfileInput2Page from "./Page/ProfileInput2Page";
import ProfileInputPage from "./Page/ProfileInputPage";
import RegistrationNumberInputPage from "./Page/RegistrationNumberInputPage";

export default function InitProfileUI() {
  const controllerRef = useRef({
    next: () => {},
    prev: () => {},
  });

  const onClickNext = () => {
    controllerRef.current.next();
  };

  return (
    <S.Wrapper>
      <S.PageStackWrapper>
        <PageStack controller={controllerRef}>
          <Page>
            <RegistrationNumberInputPage />
          </Page>

          <Page>
            <ProfileInputPage />
          </Page>

          <Page>
            <ProfileInput2Page />
          </Page>
        </PageStack>
      </S.PageStackWrapper>

      <S.NextButton isActive={true} onClick={onClickNext}>
        다음
      </S.NextButton>
    </S.Wrapper>
  );
}
