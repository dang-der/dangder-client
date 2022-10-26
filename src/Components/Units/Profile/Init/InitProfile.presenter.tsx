import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { profileInputState } from "../../../../Commons/Store/Profile/ProfileInitState";

import Page from "../../../Commons/PageStack/Page";
import * as S from "../../../Commons/PageStack/PageContainer.styles";
import PageStack from "../../../Commons/PageStack/PageStack";
import ProfileInput2Page from "./Page/ProfileInput2Page";
import ProfileInputPage from "./Page/ProfileInputPage";
import RegistrationNumberInputPage from "./Page/RegistrationNumberInputPage";
import { IQuery } from "../../../../Commons/Types/Generated/types";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";

interface InitProfileUIProps {
  handleCheckDogRegisterNumber: (inputs: any) => Promise<boolean>;
  handleCreateDog: (inputs: any) => Promise<boolean | undefined>;
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

  const [, setExceptionModal] = useRecoilState(exceptionModalState);


  useEffect(() => {
    setInputs({
      registerNumber: "",
      ownerBirthYear: 0,
      ownerBirthMonth: 0,
      ownerBirthDay: 0,
      dogInput: {
        imageUrls: [],
        imageFiles: [],
        dogBirthYear: 0,
        dogBirthMonth: 0,
        dogBirthDay: 0,
        isUnknownDogBirth: false,
        introduce: "",
        characters: [],
        interests: [],
        avoid: [],
      },
    });
  }, []);

  const onClickNext = async () => {
    console.log("onClickNext", currentPageIndex);

    // 강아지 등록번호 입력 페이지
    if (currentPageIndex === 0) {
      const result = await handleCheckDogRegisterNumber(inputs);
      result && setCurrentPageIndex(currentPageIndex + 1);
    }

    // 댕댕이 프로필 설정
    if (currentPageIndex === 1) {
      if (
        inputs.dogInput.imageUrls.length < 1 &&
        (!inputs.dogInput.dogBirthYear ||
          !inputs.dogInput.dogBirthMonth ||
          !inputs.dogInput.dogBirthDay) &&
        !inputs.dogInput.introduce
      ) {
        setExceptionModal({ visible: true, message: "입력값을 확인해주세요." });
        return;
      }
      setCurrentPageIndex(currentPageIndex + 1);
    }

    if (currentPageIndex === 2) {
      const result = await handleCreateDog(inputs);
      result && router.replace("/auth/login");
    }
  };

  const onClickPrevPage = () => {
    if (currentPageIndex - 1 < 0) return;
    setCurrentPageIndex((p) => p - 1);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <ArrowBackRoundedIcon onClick={onClickPrevPage} />
        <span>댕댕이 프로필 등록</span>
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

      <S.NextButton isActive={true} onClick={onClickNext}>
        {currentPageIndex === 2 ? "완료" : "다음"}
      </S.NextButton>
    </S.Wrapper>
  );
}
