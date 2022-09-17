import * as S from "./Settings.styles";

interface SettingsUIProps {
  handleUserLogout: () => Promise<void>;
  // handleDeleteUser: () => Promise<void>;
  handleClickModal: () => void;
  handleClickPasswordReset: () => void;
}

export default function SettingsUI({
  handleUserLogout,
  handleClickModal,
  handleClickPasswordReset,
}: SettingsUIProps) {
  console.log(handleUserLogout);
  // console.log(handleDeleteUser);

  const onClickLogout = () => {
    handleUserLogout();
  };

  const onClickModal = () => {
    handleClickModal();
  };

  const onClickPasswordReset = () => {
    handleClickPasswordReset();
  };

  return (
    <S.Wrapper>
      <S.SettingsWrapper>
        <S.SettingsContents>
          <S.SettingsTitle>문의</S.SettingsTitle>
          <S.SettingsLine></S.SettingsLine>
          <S.SettingsSubContents>
            <S.SettingsSubTitle>고객지원</S.SettingsSubTitle>
            <S.SettingsSubIcon src={"/rightArrow.svg"} />
          </S.SettingsSubContents>
        </S.SettingsContents>
        <S.SettingsContents>
          <S.SettingsTitle>법적고지</S.SettingsTitle>
          <S.SettingsLine></S.SettingsLine>
          <S.SettingsSubContents>
            <S.SettingsSubTitle>라이선스</S.SettingsSubTitle>
            <S.SettingsSubIcon src={"/rightArrow.svg"} />
          </S.SettingsSubContents>
          <S.SettingsSubContents>
            <S.SettingsSubTitle>이용약관</S.SettingsSubTitle>
            <S.SettingsSubIcon src={"/rightArrow.svg"} />
          </S.SettingsSubContents>
        </S.SettingsContents>
        <S.SettingsApiContents>
          <S.SettingsLine></S.SettingsLine>
          <S.SettingsApiTitle>
            <S.SettingsApi onClick={onClickLogout}>로그아웃</S.SettingsApi>
          </S.SettingsApiTitle>
          <S.SettingsApiTitle>
            <S.SettingsApi onClick={onClickPasswordReset}>
              비밀번호 변경
            </S.SettingsApi>
          </S.SettingsApiTitle>
          <S.SettingsBottom>
            <S.SettingsApiSubTitle>
              <S.SettingsVersion>버전 1.0.0</S.SettingsVersion>
            </S.SettingsApiSubTitle>
            <S.SettingsApiSubTitle>
              <S.SettingsDelete onClick={onClickModal}>
                계정 삭제하기
              </S.SettingsDelete>
            </S.SettingsApiSubTitle>
          </S.SettingsBottom>
        </S.SettingsApiContents>
      </S.SettingsWrapper>
    </S.Wrapper>
  );
}
