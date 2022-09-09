import { SettingsInputSvideo } from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { signUpInputState } from "../../../../Commons/Store/Auth/SignUpState";
import { profileInputState } from "../../../../Commons/Store/Profile/ProfileInitState";
import { ICharacter, IQuery } from "../../../../Commons/Types/Generated/types";
import { PageController } from "../../../Commons/PageStack/Controller";
import Page from "../../../Commons/PageStack/Page";
import * as S from "../../../Commons/PageStack/PageContainer.styles";
import PageStack from "../../../Commons/PageStack/PageStack";
import ProfileInput2Page from "./Page/ProfileInput2Page";
import ProfileInputPage from "./Page/ProfileInputPage";
import RegistrationNumberInputPage from "./Page/RegistrationNumberInputPage";

interface InitProfileUIProps {
  handleCheckDogRegisterNumber: (inputs: any) => Promise<boolean>;
  handleCreateDog: (inputs: any) => void;
  selectedData: {
    characters: Pick<IQuery, "fetchCharacters"> | undefined;
    interests: Pick<IQuery, "fetchInterests"> | undefined;
  };
}

export default function InitProfileUI({
  handleCheckDogRegisterNumber,
  handleCreateDog,
  selectedData,
}: InitProfileUIProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputs, setInputs] = useRecoilState(profileInputState);

  const onClickNext = async (
    nextIndex: number,
    currentPageInfo: any,
    data: any
  ) => {
    console.log("onClickNext", nextIndex);

    // 강아지 등록번호 입력 페이지
    if (nextIndex - 1 === 0) {
      const result = await handleCheckDogRegisterNumber(data);
      result && setCurrentPageIndex(nextIndex);
    }

    // 댕댕이 프로필 설정
    if (nextIndex - 1 === 2) {
      console.log("onClickNext : 댕댕이 프로필 설정");
      await handleCreateDog(data);
    }
    setCurrentPageIndex(nextIndex);
  };

  const controller = useMemo(() => {
    return new PageController({
      pages: [
        <RegistrationNumberInputPage key={uuid()} />,
        <ProfileInputPage key={uuid()} />,
        <ProfileInput2Page key={uuid()} />,
      ],
      onClickNext,
    });
  }, []);

  return (
    <S.Wrapper>
      <S.PageStackWrapper>
        <PageStack currentPageIndex={currentPageIndex}>
          <Page>
            <RegistrationNumberInputPage />
          </Page>

          <Page>
            <ProfileInputPage />
          </Page>

          <Page>
            {selectedData.characters?.fetchCharacters &&
            selectedData.interests?.fetchInterests ? (
              <ProfileInput2Page
                characters={selectedData.characters.fetchCharacters}
                interests={selectedData.interests.fetchInterests}
              />
            ) : (
              <div>loading...</div>
            )}
          </Page>
        </PageStack>
      </S.PageStackWrapper>

      <S.NextButton isActive={true} onClick={() => controller.nextPage(inputs)}>
        {currentPageIndex === 2 ? "완료" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
