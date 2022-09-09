import { SettingsInputSvideo } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { signUpInputState } from "../../../../Commons/Store/Auth/SignUpState";
import {
  IProfileInputState,
  profileInputState,
} from "../../../../Commons/Store/Profile/ProfileInitState";
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
  handleCreateDog: (inputs: any) => Promise<boolean>;
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
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputs, setInputs] = useRecoilState(profileInputState);

  const onClickNext = async (
    currentIndex: number,
    currentPageInfo: any,
    data: IProfileInputState
  ) => {
    console.log("onClickNext", currentIndex);

    // 강아지 등록번호 입력 페이지
    if (currentIndex === 0) {
      const result = await handleCheckDogRegisterNumber(data);
      result && setCurrentPageIndex(currentIndex + 1);
    }

    // 댕댕이 프로필 설정
    if (currentIndex === 1) {
      if (
        data.createDogInput.imageUrls.length < 1 &&
        (!data.createDogInput.dogBirthYear ||
          !data.createDogInput.dogBirthMonth ||
          !data.createDogInput.dogBirthDay) &&
        !data.createDogInput.introduce
      ) {
        // todo : 에러 다이얼로그 띄우기
        return;
      }
      setCurrentPageIndex(currentIndex + 1);
    }

    if (currentIndex === 2) {
      const result = await handleCreateDog(data);
      result && router.replace("/");
    }
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
